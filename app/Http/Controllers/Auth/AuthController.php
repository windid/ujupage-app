<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Support\Facades\Mail;

use App\Http\Models\UserActive;

class AuthController extends Controller
{
    
    protected $redirectPath = '/';
    
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => ['getLogout', 'getActive']]);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|confirmed|min:6',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.a
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
        
        $token = UserActive::createNewToken();
        if ($user) {
            Mail::send('emails.active_email', ['user' => $data['name'], 'token' => $token], function ($m) use ($data, $token) {
                
                $from = config('mail')['from'];
                $m->from($from['address'], $from['name']);
                $m->to($data['email'], $data['name'])->subject('你的激活链接');
                
                UserActive::create([
                    'email' => $data['email'],
                    'token' => $token,
                    'created_at' => date('Y-m-d H:i:s', time())
                ]);
            });
        }
        return $user;
    }
    
    
    /**
     * 激活Auth回调
     * @param string $token 
     */
    public function getActive($token = null) {
        if ($token) {
            $active = UserActive::where('token', $token)->first();
            if ($active) {
                
                $user = User::where('email', $active['email'])->first();
                $user->actived_at = time();
                $user->save();
                
                $active->where('token', $token)->delete();                
            }
        }
        
        return redirect('/');
    }
}
