<?php

use App\User;

class GroupTest extends TestCase {
        
    public $project;
    
    protected function setUp() {
        parent::setUp();
        $this->be(User::where('email', 'heyufa@ujumedia.com')->first());
                
        $response = $this->call('GET', '/project');        
        $this->project = json_decode($response->content())[0];
    }        
    
    public function testIndex() {
        $response = $this->call('GET', '/projects/' . $this->project->id . '/groups');
//        $this->dump();
    }
    
    public function testStore() {
        $response = $this->call('POST', '/projects/' . $this->project->id . '/groups', [
            'name' => 'GROUP_' . rand(100,999)
        ]);
//        $this->dump();
        return json_decode($response->content())->id;
    }
    
    /**
     * @depends testStore
     */
    public function testUpdate($group_id) {        
        $response = $this->call('PUT', '/projects/' . $this->project->id . '/groups/' . $group_id, [
            'name' => 'New_GROUP_' . rand(100,999)
        ]);
//        $this->dump();
    }
    
    /**
     * @depends testStore
     */
    public function testDestroy($group_id) {        
        $response = $this->call('DELETE', '/projects/' . $this->project->id . '/groups/' . $group_id);
    }
}