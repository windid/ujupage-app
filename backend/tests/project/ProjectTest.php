<?php

use App\User;

class ProjectTest extends TestCase {
    
    protected function setUp() {
        parent::setUp();
        $this->be(User::where('email', 'heyufa@ujumedia.com')->first());
    }        
    
    public function testIndex() {
        $response = $this->call('GET', '/project');
        $this->assertJson($response->content());
        
    }
    
    public function testStore() {
        $response = $this->call('POST', '/project', [
            'name' => 'TestProject' . rand(100, 999)
        ]);
        
        $this->assertJson($response->content());
        return json_decode($response->content())->id;
    }
    
    /**
     * @depends testStore
     */
    public function testUpdate($project_id) {
        $response = $this->call('PUT', '/project/' . $project_id, [
            'name' => 'TestProject_New_' . rand(100, 900)
        ]);
        
        $this->assertJson($response->content());
    }
    
    /**
     * @depends testStore
     */
    public function testDestroy($project_id) {
        $response = $this->call('DELETE', '/project/' . $project_id);
    }
}