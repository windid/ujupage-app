<?php

namespace App\Http\Controllers\Api\Project;

use App\Http\Controllers\Api\Controller;
use Symfony\Component\HttpFoundation\Request;
use Illuminate\Support\Facades\Mail;

use App\Models\Project\Project;
use App\Models\Project\ProjectInvite;

class UserController extends Controller {
    
    public $user;
    public $project;
    public $projectInvite;
    
    public function __construct() {
        $this->user = auth()->user();
        
        $this->project = new Project;
        $this->projectInvite = new ProjectInvite;
    }
    
    /**
     * 获取用户项目下的所有用户
     * @param int $project_id
     * @return json
     * 
     */    
    public function index($project_id) {
        $users = $this->user->projects()->find($project_id)->users()->withPivot('role')->get()->toArray();
        
        $invites = $this->projectInvite->where('project_id', $project_id)->lists('email', 'id')->toArray();
        
        
        return $this->successOK([ 'users' => $users, 'invites' => $invites]);
    }
    
    /**
     * 获取用户项目下的单个用户
     * @param int $project_id
     * @param int $user_id
     * @return json
     * 
     */    
    public function show($project_id, $user_id) {
        $user = $this->user->projects()->find($project_id)
                ->users()->withPivot('role')->find($user_id)->toArray();
        
        return $this->successOK($user);
    }
    
    /**
     * 邀请用户参加项目
     * @param \Illuminate\Http\Request $request
     * @param int $project_id
     * @return json
     * 
     */    
    public function store(Request $request, $project_id) {
        
        $project = $this->user->projects()->withPivot('role')->find($project_id);
        if (!$project) {
            return $this->errorNotFound();
        }
        
        if ($project->pivot->role != 'admin') {
            return $this->errorUnauthorized();
        }
        
        $validator = validator($request->all(), [
            'email' => 'required|email|exists:users',
        ]);
        $user = $this->user;
        $email = $request->get('email');
        if ($validator->fails()) { // 用户不存在发邮箱通知
            $this->projectInvite->project_id = $project->id;
            $this->projectInvite->i = md5(uniqid(time() . mt_rand(1,1000000)));
            $this->projectInvite->email = $email;
            $this->projectInvite->save();
            
            Mail::send('auth.emails.invite', ['email' => $email, 'i' => $this->projectInvite->i], function ($m) use ($email, $user, $project) {
                $from = config('mail')['from'];
                $m->from($from['address'], $from['name']);
                $m->to($email, $email)->subject($user['email'] . '邀请你加入'.$project->name.'项目');
            });
        } else {

            $i_user = $this->user->where('email', $email)->first();

            $validator = validator(['user_id' => $i_user['id']], [
                'user_id' => 'unique:project_users,user_id,null,id,project_id,'.$project->id,
            ]);
            if ($validator->fails()) {
                return $this->errorValidation($validator);
            }

            $project->users()->attach($i_user, ['role' => 'member']);
            Mail::send('auth.emails.invited', ['email' => $email, 'project' => $project], function ($m) use ($email, $user, $project) {
                $from = config('mail')['from'];
                $m->from($from['address'], $from['name']);
                $m->to($email, $email)->subject($user['email'] . '已邀请你加入'.$project->name.'项目');
            });
        }
        
        return $this->successCreated();
    }
    
    /**
    * 删除或退出该项目下的用户
    * @param \Illuminate\Http\Request $request
    * @param int $project_id
    * @return json
    * 
    */
    public function destroy(Request $request, $project_id, $user_id) {
        $project = $this->user->projects()->withPivot('role')->find($project_id);
        if (!$project) {
            return $this->errorNotFound();
        }        
        
        if ($project->user_id == $user_id) {
            return $this->errorUnauthorized();
        }
        
        if ($project->pivot->role == 'admin'
                || $user_id == $this->user->id) {
            $project->users()->detach($user_id);
        }
                
        return $this->successNoConnect();
    }
    
    /**
    * 删除未确认邀请
    * @param int $project_id
    * @param int $invite_id
    * @return json
    * 
    */
    public function destroyInvites($project_id, $invite_id) {
        $project = $this->user->projects()->find($project_id);
        if (!$project) {
            return $this->errorNotFound();
        }        
        
        $invite = $this->projectInvite->where('project_id', $project_id)->find($invite_id);  
        if (!$invite) {
            return $this->errorNotFound();
        }
        $invite->delete();
                
        return $this->successNoConnect();
    }
}