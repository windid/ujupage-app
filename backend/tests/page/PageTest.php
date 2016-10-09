<?php

use App\User;

class PageTest extends TestCase {
    
    public $project;
    public $group;
    
    protected function setUp() {
        parent::setUp();
        $this->be(User::where('email', 'heyufa@ujumedia.com')->first());
                
        $response = $this->call('GET', '/project');        
        $this->project = json_decode($response->content())[0];
        $response = $this->call('GET', '/projects/' . $this->project->id . '/groups');
        $this->group = json_decode($response->content())[0];
    }        
    
    public function testIndex() {
        $response = $this->call('GET', '/page', [
            'group_id' => $this->group->id
        ]);
//        $this->dump();
        $this->assertJson($response->content());
    }
    
    public function testStore() {
        $response = $this->call('POST', '/page', [
            'group_id' => $this->group->id,
            'name' => 'Page_' . rand(100,900)
        ]);
        $this->assertJson($response->content());
        
        return json_decode($response->content())->id;
    }
    
    /**
     * @depends testStore
     */
    public function testShow($page_id) {
        $response = $this->call('GET', '/page/' . $page_id);
        $this->assertJson($response->content());        
    }
    
    /**
     * @depends testStore
     */
    public function testUpdate($page_id) {
        $response = $this->call('PUT', '/page/' . $page_id, [
            'name' => 'NEW_Page_' . rand(100,900),
            'url' => 'NEWURL' . rand(100,900)
        ]);
        $this->assertJson($response->content());        
    }
    
    /**
     * @depends testStore
     */
    public function testCopy($page_id) {
        $response = $this->call('POST', '/page/' . $page_id . '/copy', [
            'name' => 'NEW_Page_' . rand(100,900)
        ]);
        $this->assertJson($response->content());        
    }
    /**
     * @depends testStore
     */
    public function testPublish($page_id) {
        $response = $this->call('GET', '/page/' . $page_id . '/publish');
        $this->assertJson($response->content());        
    }
    
    /**
     * @depends testStore
     */
    public function testDestroy($page_id) {
        $response = $this->call('DELETE', '/page/' . $page_id); 
    }
}