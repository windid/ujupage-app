<?php

use App\User;

class OverviewTest extends TestCase {
    
    public $page_id;
    
    protected function setUp() {
        parent::setUp();
        $this->be(User::where('email', 'heyufa@ujumedia.com')->first());
                
        $this->page_id = 34;
    }        
        
    public function testGather() {
        $response = $this->call('GET', '/report/overview/' . $this->page_id . '/gather');
        $this->assertJson($response->content());     
        
    }
        
}