<?php

use App\User;

class OverviewTest extends TestCase {
    
    public $page_id;
    
    protected function setUp() {
        parent::setUp();
        $this->be(User::where('email', 'heyufa@ujumedia.com')->first());
                
        $this->page_id = 53;
    }        
        
    public function testGather() {
        $response = $this->call('GET', '/report/' . $this->page_id . '/gather');
        $this->dump();
        $this->assertJson($response->content());     
        
    }
        
}