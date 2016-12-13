<?php

namespace App\Http\Controllers\Api\Auth;

use App\User;
use Validator;
use App\Http\Controllers\Api\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use App\Models\UserActive;
use App\Models\Project\ProjectInvite;

class AuthController extends Controller {

    public $projectInvite;
    
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
                    'email' => ['required', 'email', 'max:255', 'unique:users'],
                    'password' => 'required|min:6',
                    'i' => 'alpha_num'
        ]);
    }

    
    public function getRegister(string $i = '') {
        return view('auth.register', ['i' => $i]);
    }
    

    public function postRegister(Request $request) {
        $validator = $this->validator($request->all());
        $request->merge(['username' => $request->input('email')]);
        if ($validator->fails()) {
            return $this->errorValidation($validator);            
        }

        $user = $this->create($request->all());        
        Auth::guard($this->getGuard())->login($user);
                        
        if ($user->actived_at > 0 && $this->projectInvite) {
            $project_id = $this->projectInvite->project_id;
            
            $this->projectInvite->where('project_id', $project_id)
                                ->where('email', $this->projectInvite->email)
                                ->delete();
            
            $user_project = array_merge($user->toArray(), ['project_id' => $project_id]);
            return $this->successCreated($user_project);
        }
        
        return $this->successCreated($user->toArray());
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
        
        $i = request('i', '');
        $this->projectInvite = ProjectInvite::where('i', $i)
                                        ->where('email', $user->email)
                                        ->first();
        $user->actived_at = 0;
        if ($this->projectInvite) {
            $user->projects()->attach($this->projectInvite->project_id, ['role' => 'member']);  
            
            $user->actived_at = time();
            $user->save();
            
            return $user;
        }
        $token = UserActive::createNewToken();
        if ($user && $user->actived_at == 0) {
            Mail::send('auth.emails.active_email', ['user' => $data['name'], 'token' => $token], function ($m) use ($data, $token) {

                $from = config('mail')['from'];
                $m->from($from['address'], $from['name']);
                $m->to($data['email'], $data['name'])->subject('验证您的邮箱');

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
                return $this->errorGone();
            }
        } else {
            return $this->errorInvalidRequest();
        }
        return $this->successCreated();
    }

    
    /**
     * Validate the given request with the given rules.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array  $rules
     * @param  array  $messages
     * @param  array  $customAttributes
     * @return void
     */
    public function validate(Request $request, array $rules, array $messages = [], array $customAttributes = [])
    {
        return $this->getValidationFactory()->make($request->all(), $rules, $messages, $customAttributes);
    }

    /**
     * 提交登录 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function postLogin(Request $request) {
        
        $validator = $this->validate($request, [
            $this->loginUsername() => 'required|exists:users,email', 'password' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->errorValidation($validator);
        }

        $credentials = $this->getCredentials($request);
        if (Auth::attempt($credentials, ($request->has('remember') && $request->get('remember') == 'true'))) {
            $user = Auth::user();
            $user->token = UserActive::createNewToken();
            $user->save();
            
            //return redirect()->intended('/');
            return $this->successCreated(['id' => $user->id, 'name' => $user->name, 'email' => $user->email]);
        }
        
        return $this->errorUnauthorized();
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

            return $this->successOK();
        } else {
            return $this->errorNotFound();
        }
    }
}
