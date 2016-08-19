<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Request;
use Illuminate\Support\Facades\Mail;

use App\Models\Project\Project;
use App\Models\Project\ProjectUser;
use App\Models\Project\ProjectInvite;

class InviteController extends Controller {
    
    public $user;
    public $project;
    public $projectUser;
    public $projectInvite;
    
    public function __construct() {
        $this->user = auth()->user();
        
        $this->project = new Project;
        $this->projectUser = new ProjectUser;
        $this->projectInvite = new ProjectInvite;
    }
    
    /**
     * 查看该项目的协作人
     * @param int $project_id 项目ID
     * @return json {
     *  {
     *   id = 协作人ID
     *   name = 协作人昵称
     *   email = 协作人邮箱
     *  }
     * }
     */
    public function get(int $project_id) {
        $project = $this->user->projects()->find($project_id);
        if (!$project) {
            return $this->err('not found project');
        }
        
        return $this->dump(['users' => $project->users()->withPivot('role')
                                                            ->get()->toArray()
                            ,'uninvitor' => $project->invitors()
                                                   ->get()
                                                   ->toArray()
                ]);
    }
    
    /**
     * 删除该协作人
     * @param int $project_id 项目ID
     * @param int $user_id 协作人ID
     * @return json {
     *  result = true
     * }
     */
    public function remove(int $project_id, int $user_id) {
        $project = $this->user->projects(true)->find($project_id);
        if (!$project) {
            return $this->err('not found project');
        }
        if ($project->user_id == $user_id) {
            return $this->err('cant remove creator');
        }
        if ($project->pivot->role != 'admin') {
            return $this->err('not admin role');
        }
        
        $project->users()->detach($user_id);
        
        return $this->dump();
    }
    
    /**
     * 退出协作
     * @param int $project_id 项目ID
     * @return json {
     *  result = true
     * }
     */
    public function quit(int $project_id) {
        $project = $this->user->projects()->find($project_id);
        if (!$project) {
            return $this->err('not found project');
        }        
        if ($project->user_id == $this->user->id) {
            return $this->err('creator cant quit');
        }
        
        $project->users()->detach($this->user->id);
        
        return $this->dump();
    }
    
    /**
     * 发邮件通知邀请协作
     * @param int $project_id 项目ID
     * @param string $email 被邀请人邮箱
     * @return json {
     *  result = true
     * }
     */
    public function join(Request $request) {
        
        $validator = validator($request->all(), [
            'project_id' => 'required|integer',
            'email' => 'required|email',
        ]);
        if ($validator->fails()) {
            return $this->err($validator->errors()->first());
        }
        $project_id = $request->get('project_id', 0);
        $project = $this->user->projects(true)->find($project_id);
        if (!$project) {
            return $this->err('not found project');
        } 
        if ($project->pivot->role != 'admin') {
            return $this->err('not admin role');
        }
        $email = $request->get('email');
        $user = $this->user;
        $i_user = $this->user->where('email', $email)->first();
        if ($i_user) { // 用户存在直接加入该项目
            if ($i_user->id == $project->user_id) {
                return $this->err('email is creator');
            }
            if ($project->users()->find($i_user->id)) {
                return $this->err('member exits');
            }
            $project->users()->attach($i_user, ['role' => 'member']);
            Mail::send('auth.emails.invited', ['email' => $email, 'project' => $project], function ($m) use ($email, $user, $project) {
                $from = config('mail')['from'];
                $m->from($from['address'], $from['name']);
                $m->to($email, $email)->subject($user['email'] . '已邀请你加入'.$project->name.'项目');
            });
        } else { // 用户不存在发邮箱通知
            $this->projectInvite->project_id = $project->id;
            $this->projectInvite->i = md5(uniqid(time() . mt_rand(1,1000000)));
            $this->projectInvite->email = $email;
            $this->projectInvite->save();
            
            Mail::send('auth.emails.invite', ['email' => $email, 'i' => $this->projectInvite->i], function ($m) use ($email, $user, $project) {
                $from = config('mail')['from'];
                $m->from($from['address'], $from['name']);
                $m->to($email, $email)->subject($user['email'] . '邀请你加入'.$project->name.'项目');
            });
        }
        
        return $this->dump();
    }
}