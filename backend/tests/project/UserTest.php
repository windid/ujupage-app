<?php

use \App\User;

class UserTest extends TestCase {
    
    public $project;
    
    protected function setUp() {
        parent::setUp();
        $this->be(User::where('email', 'heyufa@ujumedia.com')->first());
        
        $response = $this->call('GET', '/project');        
        $this->project = json_decode($response->content())[0];
    }
    
    public function testIndex() {
        $response = $this->call('GET', '/projects/' . $this->project->id . '/users');
        
        $this->assertJson($response->content());
        
        return json_decode($response->content())[0];
    }
    
    /**
     * @depends testIndex
     */
    public function testShow($user) {
        $response = $this->call('GET', '/projects/' . $this->project->id . '/users/' . $user->id);
        
        $this->assertJson($response->content());        
    }
    
    public function testStore() {
        $response = $this->call('POST', '/projects/' . $this->project->id . '/users/', [
            'email' => 'cenne1986@qq.com'
        ]);
    }
    
    public function testDestory() {
        $response = $this->call('DELETE', '/projects/' . $this->project->id . '/users/1');
    }
    
}