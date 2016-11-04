<?php

class TestCase extends Illuminate\Foundation\Testing\TestCase
{
    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://app.ujupage.com/api';

    
    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {   
        $_SERVER['X_Requested_With'] = 'XMLHttpRequest';
        $app = require __DIR__.'/../bootstrap/app.php';

        $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap([
            'Illuminate\Foundation\Bootstrap\DetectEnvironment',
            'Illuminate\Foundation\Bootstrap\LoadConfiguration',
            'Illuminate\Foundation\Bootstrap\RegisterFacades',
            'Illuminate\Foundation\Bootstrap\SetRequestForConsole',
            'Illuminate\Foundation\Bootstrap\RegisterProviders',
            'Illuminate\Foundation\Bootstrap\BootProviders',
        ]);        
        
        return $app;
    }
    
    public function call($method, $uri, $parameters = array(), $cookies = array(), $files = array(), $server = array(), $content = null) {
        if (!isset($server['HTTP_X-Requested-With'])) {
            $server = array_merge($server, ['HTTP_X-Requested-With' => 'XMLHttpRequest']);
        }
        return parent::call($method, $uri, $parameters, $cookies, $files, $server, $content);
    }
    
}
