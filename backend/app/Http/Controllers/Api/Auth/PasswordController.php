<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Password;

use App\Models\User\PasswordReset;

class PasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;
    
    protected $subject = '您的密码重设链接';
    
    protected $redirectPath = '/';

    /**
     * Create a new password controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
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
     * 提交你的email
     * @param Illuminate\Http\Request $request
     * @return json
     */
    public function postEmail(Request $request) {
        $validator = $this->validate($request, ['email' => 'required|email']);
        if ($validator->fails()) {
            return $this->errorValidation($validator);
        }
        $response = Password::sendResetLink($request->only('email'), function (Message $message) {
            $message->subject($this->getEmailSubject());
        });

        switch ($response) {
            case Password::RESET_LINK_SENT:
                return $this->successOK();
                //return $this->getSendResetLinkEmailSuccessResponse($response);
            case Password::INVALID_USER:
            default:
                return $this->errorNotFound();
                //return $this->getSendResetLinkEmailFailureResponse($response);
        }
    }
    
    /**
     * 提交重设密码
     * @param  \Illuminate\Http\Request  $request
     * @return json
     */
     public function postReset(Request $request)
    {
        $validator = $this->validate($request, [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:6',
        ]);
        if ($validator->fails()){
            return $this->errorValidation($validator);
        }

        $credentials = $request->only(
            'email', 'password', 'password_confirmation', 'token'
        );
        
        $response = Password::reset($credentials, function ($user, $password) {
            $this->resetPassword($user, $password);
        });

        switch ($response) {
            case Password::PASSWORD_RESET:
                return $this->successCreated();
                //return $this->getResetSuccessResponse($response);
            default:
                return $this->errorNotFound();
                //return $this->getResetFailureResponse($request, $response);
        }
    }
}
