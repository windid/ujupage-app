<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use App\Models\UserActive;

class AuthController extends Controller {

    protected $redirectPath = '/';
    //protected $username = 'username';

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

use AuthenticatesAndRegistersUsers,
    ThrottlesLogins;

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('guest', ['except' => ['getLogout', 'getActive']]);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data) {
        return Validator::make($data, [
                    'name' => 'required|max:255',
                    'email' => ['required', 'email', 'max:255', 'unique:users', 'regex:/^(.*)(@ujumedia.com)$/'],
                    'password' => 'required|confirmed|min:6',
        ]);
    }

    /*
      public function getRegister() {
      //parent::getRegister();
      return response()->json(["_csrf" => csrf_token()]);
      }
     */

    public function postRegister(Request $request) {
        $validator = $this->validator($request->all());
        $request->merge(['username' => $request->input('email')]);
        if ($validator->fails()) {
            $this->throwValidationException(
                    $request, $validator
            );
        }

        $user = $this->create($request->all());
        
        return view('auth.registerok'
                , compact('user'));
    }

    /**
     * Create a new user instance after a valid registration.a
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data) {

        $user = User::create([
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'password' => bcrypt($data['password'])
        ]);

        $token = UserActive::createNewToken();
        if ($user) {
            Mail::send('auth.emails.active_email', ['user' => $data['name'], 'token' => $token], function ($m) use ($data, $token) {

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
        $user->token = UserActive::createNewToken();
        $user->save();
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
            } else {
                return view('auth.active', ['error' => '激活失败']);
            }
        } else {
            return view('auth.active', ['error' => '激活失败']);
        }
        return view('auth.active', ['result' => '激活成功']);
    }

    /**
     * 登录和退出
     */
    /**
     * 登录获取
     * return json ['_csrf']
     */
    /*
      public function getLogin() {
      return response()->json(['_csrf' => csrf_token()]);
      }
     * 
     */
    

    /**
     * 提交登录 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function postLogin(Request $request) {
        
        $this->validate($request, [
            $this->loginUsername() => 'required', 'password' => 'required',
        ]);

        $credentials = $this->getCredentials($request);
        if (Auth::attempt($credentials, $request->has('remember'))) {
            $user = Auth::user();
            $user->token = UserActive::createNewToken();
            $user->save();
            
            return redirect()->intended('/');
            //return redirect($request->get('to', '/'));
            //return response()->json(['auth' => $user]);
        }
        
        return $this->sendFailedLoginResponse($request);
        //return response()->json(['_csrf' => csrf_token(), 'error' => $this->getFailedLoginMessage()]);
    }

    /**
     * 退出登录
     */
    public function getLogout(Request $request) {
        $user = Auth::user();
        if ($user) {
            Auth::logout();
            User::where('id', $user->id)
                    ->update(['token' => UserActive::createNewToken()]);

            return view('auth.logout', ['result' => '成功登出']);
        } else {
            return view('auth.logout', ['error' => '找不到相关用户']);
        }
    }
       
}
