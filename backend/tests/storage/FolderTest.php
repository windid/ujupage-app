<?php

use App\User;

class FolderTest extends TestCase {
        
    public $project;
    
    protected function setUp() {
        parent::setUp();
        $this->be(User::where('email', 'heyufa@ujumedia.com')->first());
                
        $response = $this->call('GET', '/project');        
        $this->project = json_decode($response->content())[0];
    }        
    
    public function testIndex() {
        $response = $this->call('GET', '/storage/folder', [
            'project_id' => $this->project->id
        ]);
//        $this->dump();
    }
    
    public function testStore() {
        $response = $this->call('POST', '/storage/folder', [
            'project_id' => $this->project->id,
            'dirname' => 'Folder_' . rand(100,900)
        ]);
        
        return json_decode($response->content())->id;
    }
    
    /**
     * @depends testStore
     */
    public function testUpdate($foleder_id) {
        $response = $this->call('PUT', '/storage/folder/' . $foleder_id, [
            'mod_dirname' => 'New_Folder_' . rand(100,900)
        ]);
    }
    
    /**
     * @depends testStore
     */
    public function testDestroy($foleder_id) {
        $response = $this->call('DELETE', '/storage/folder/' . $foleder_id);
    }
}