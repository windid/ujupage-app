<?php
namespace App\Http\Controllers\Api\Account;

use App\Http\Controllers\Api\Controller;
use Symfony\Component\HttpFoundation\Request;

class AccountController extends Controller{
    public function current(){
        $account = ['id' => '2', 'email' => 'xiewendong@ujumedia.com'];
        return $this->successOK($account);
    }
}
?>