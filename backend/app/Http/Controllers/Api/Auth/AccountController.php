<?php
namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\Controller;
use Symfony\Component\HttpFoundation\Request;

class AccountController extends Controller{
    public function current(){
        $this->user = auth()->user();
        if (!$this->user) {
            return $this->errorUnauthorized();
        }
        return $this->successOK(json_encode([
            'id' => $this->user->id,
            'name' => $this->user->name,
            'email' => $this->user->email
        ]));
    }
}
?>