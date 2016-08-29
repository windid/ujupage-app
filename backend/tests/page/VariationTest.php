<?php

use App\User;

class VariationTest extends TestCase {
    
    public $project;
    public $group;
    public $page;
    
    protected function setUp() {
        parent::setUp();
        $this->be(User::where('email', 'heyufa@ujumedia.com')->first());
                
        $response = $this->call('GET', '/project');        
        $this->project = json_decode($response->content())[0];
        $response = $this->call('GET', '/projects/' . $this->project->id . '/groups');
        $this->group = json_decode($response->content())[0];
        $response = $this->call('GET', '/page', ['group_id' => $this->group->id]);
        $this->page = json_decode($response->content())[0];
    }        
    
    public function testIndex() {
        $response = $this->call('GET', '/pages/' . $this->page->id . '/variations');
        $this->assertJson($response->content());
//        $this->dump();
    }
    
    public function testStore() {
        $response = $this->call('POST', '/pages/' . $this->page->id . '/variations');
        $this->assertJson($response->content());
        if ($response->getStatusCode() == 422) {
            $this->dump();
        }
        return json_decode($response->content())->id;
    }
    
    /**
     * @depends testStore
     */
    public function testUpdate($variation_id) {
        $response = $this->call('PUT', '/pages/' . $this->page->id . '/variations/' . $variation_id, [
            'name' => 'abcd'
        ]);
        $this->assertJson($response->content());
    }
    
    /**
     * @depends testStore
     */
    public function testShow($variation_id) {
        $response = $this->call('GET', '/pages/' . $this->page->id . '/variations/' . $variation_id);
        $this->assertJson($response->content());
        
//        $this->dump();
    }
    
    /**
     * @depends testStore
     */
    public function testCopy($variation_id) {
        $response = $this->call('COPY', '/pages/' . $this->page->id . '/variations/' . $variation_id . '/copy');        
        return json_decode($response->content())->id;
    }
    
    /**
     * @depends testStore
     * @depends testCopy
     */
    public function testDestroy($variation_id, $copy_variation_id) {
        $this->call('DELETE', '/pages/' . $this->page->id . '/variations/' . $variation_id);
        $this->call('DELETE', '/pages/' . $this->page->id . '/variations/' . $copy_variation_id);
    }
    
}