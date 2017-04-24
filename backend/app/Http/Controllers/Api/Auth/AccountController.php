<?php
namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\Controller;
use Symfony\Component\HttpFoundation\Request;

use App\Services\OSS;

class AccountController extends Controller{
    
    /**
     * 获取当前的用户信息
     * 
     * @return json User
     */
    
    public function current(){
        $this->user = auth()->user();
        if (!$this->user) {
            return $this->errorUnauthorized();
        }
        return $this->successOK($this->user->toArray());
    }    
    
    
    /**
     * 修改用户信息及上传头像
     * 
     * @param File avatar 头像图片
     * @param string name 用户名字
     * @param string old_password 旧密码
     * @param string password 新密码
     * @param string password_confirmation 确认密码
     * @return json User
     */
    public function update(Request $request) {
        
        $user = auth()->user();
        $old_name = '';
        if ($request->hasFile('avatar')) {
            $validator = validator($request->allFiles(), ['avatar' => 'required|image']);
            if ($validator->fails()) {
                return $this->errorValidation($validator);
            }
            
            $avatar = $request->file('avatar');
                // 定义文件名
            $filepathOSS = str_replace('php','',$avatar->getBasename())
                    .'.'
                    .$avatar->getClientOriginalExtension();
            // 定义文件夹
            $filepathOSS = date('Ymd')
                    .'/'
                    .$filepathOSS;

            OSS::upload($filepathOSS, $avatar->getRealPath());   
            
            $user->avatar = OSS::getUrlCdn($filepathOSS);
        } else {
            $input = [
                'name' => $request->get('name', $user->name),
                'old_password' => $request->get('old_password', ''),
                'password' => $request->get('password', ''),
                'password_confirmation' => $request->get('password_confirmation', '')
            ];            
            $validator = validator($input, ['name' => 'required|max:255']);
            if ($validator->fails()) {
                return $this->errorValidation($validator);
            }
            $old_name = $user->name;
            $user->name = $input['name'];
            if (!empty($input['old_password']) 
                    && !empty($input['password']) 
                    && !empty($input['password_confirmation'])) {
                
                $credential = \Illuminate\Support\Facades\Auth::attempt(['email' => $user->email
                        , 'password' => $input['old_password']]);
                if (!$credential) {
                    return $this->errorUnauthorized();
                }
                
                $validator = validator($input, ['password' => 'required|min:6|confirmed']);
                if ($validator->fails()) {
                    return $this->errorValidation($validator);
                }
                
                $user->password = bcrypt($input['password']);
            }
        }
        $user->save();
        /*
        if (!empty($old_name)) {            
            $project = \App\Models\Project\Project::where('user_id', $user->id)
                    ->where('name', 'like', '%' . $user->name . '%')
                    ->where('is_default', '1')->first();
            $project->name = str_replace($old_name, $user->name, $project->name);
            $project->save();
        }*/
        return $this->successOK($user->toArray());
    }
}