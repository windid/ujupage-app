<?php

use \App\User;

class AuthTest extends TestCase {
    
    public $user_email = 'heyufa@ujumedia.com';
  /*
    public function testRegister() {
        $response = $this->call('POST', '/auth/register'
                , [
                    'email' => $this->user_email,
                    'name' => 'chrisho',
                    'password' => '123456',
                    'password_confirmation' => '123456'
                ]);
        $this->assertJson($response->content());
    }    
    
    public function testActive() {
        $active = \App\Models\UserActive::where('email', $this->user_email)->first();
               
        if ($active) {
            $response = $this->call('GET', '/auth/active/' . $active->token);
            $this->assertJson($response->content());
        }
    }
    
    public function testPasswordReset() {
        $response = $this->call('POST', '/auth/password/forget'
                , [
                    'email' => $this->user_email
                ]);
        $this->assertEquals(200, $response->getStatusCode());
        
        $forget_token = \App\Models\User\PasswordReset::where('email', $this->user_email)
                ->first()->token;
        $response = $this->call('POST', '/auth/password/reset'
                , [
                    'email' => $this->user_email,
                    'password' => '12345678',
                    'password_confirmation' => '12345678',
                    'token' => $forget_token
                ]);
        $this->assertEquals(201, $response->getStatusCode());
    }
    */
    public function testPasswordReset() {
        $response = $this->call('POST', '/auth/password/forget'
                , [
                    'email' => $this->user_email
                ]);
        $this->assertEquals(200, $response->getStatusCode());
        
        $forget_token = \App\Models\User\PasswordReset::where('email', $this->user_email)
                ->first()->token;
        $response = $this->call('POST', '/auth/password/reset'
                , [
                    'password' => '12345678',
                    'password_confirmation' => '12345678',
                    'token' => $forget_token
                ]);
        dump($response);
        $this->assertEquals(201, $response->getStatusCode());
    }
    /*
    public function testLogin() {
        $response = $this->call('POST', '/auth/login'
                , [
                    'email' => $this->user_email,
                    'password' => '12345678'
                ]);
        $this->seeCookie('laravel_session');
        $this->assertEquals(201, $response->getStatusCode());
    }
    */
    /*
    public function testDelete() {
        User::where('email', $this->user_email)->delete();
    }
    */
}