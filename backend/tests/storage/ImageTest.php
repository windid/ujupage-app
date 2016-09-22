<?php

use App\User;

use Illuminate\Http\UploadedFile;

class ImageTest extends TestCase {
        
    public $project;
    public $folder;
    
    protected function setUp() {
        parent::setUp();
        $this->be(User::where('email', 'heyufa@ujumedia.com')->first());
                
        $response = $this->call('GET', '/project');        
        $this->project = json_decode($response->content())[0];
        
        $response = $this->call('GET', '/storage/folder', [
            'project_id' => $this->project->id
        ]); 
        $this->folder = json_decode($response->content())[0];
    }        
    
    public function testPersonalIndex() {
        $response = $this->call('GET', '/storage/image', [
            'folder_id' => 40,
            'page' => 1,
            'page_size' => 30
        ]);
//        $this->dump();
    }
   
    public function testPersonalStore() {
        $file = __DIR__. '/test_image.png';
        $filename = 'test_image';
        $response = $this->call('POST', '/storage/image', [
            'folder_id' => 40,
            //'url' => 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1805069078,3902678531&fm=80'
        ], []
        , [
            'file' => new UploadedFile($file, $filename, null, filesize($file), 0, true)
        ]);
//        $this->dump();
        return json_decode($response->content())->id;
    }
    
    /**
     * @depends testPersonalStore
     */
    public function testPersonalUpdate($image_id) {
        $response = $this->call('PUT', '/storage/image/' . $image_id, [
            'folder_id' => 41,
            'name' => 'abc.png',
            'alt' => 'alt.test',
        ]);
    }
    
    
    public function testIndex() {
        $response = $this->call('GET', '/storage/image', [
            'folder_id' => $this->folder->id,
            'page' => 1,
            'page_size' => 30
        ]);
//        $this->dump();
    }
   
    public function testStore() {
        $file = __DIR__. '/test_image.png';
        $filename = 'test_image';
        $response = $this->call('POST', '/storage/image', [
            'folder_id' => $this->folder->id,
            //'url' => 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1805069078,3902678531&fm=80'
        ], []
        , [
            'file' => new UploadedFile($file, $filename, null, filesize($file), 0, true)
        ]);
//        $this->dump();
        return json_decode($response->content())->id;
    }
    
    /**
     * @depends testStore
     */
    public function testUpdate($image_id) {
        $response = $this->call('PUT', '/storage/image/' . $image_id, [
            'folder_id' => $this->folder->id,
            'name' => 'abc.png',
            'alt' => 'alt.test',
        ]);
    }
    
    /**
     * @depends testStore
     */
    public function testDestroy($image_id) {
        $response = $this->call('DELETE', '/storage/image/' . $image_id);
    }
}