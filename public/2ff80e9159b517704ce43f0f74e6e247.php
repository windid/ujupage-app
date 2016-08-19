<?php
// ini_set('display_errors','on');
 $rawPost = file_get_contents("php://input");
 list($algo, $hash) = explode("=", !isset($_SERVER["HTTP_X_HUB_SIGNATURE"])?:$_SERVER["HTTP_X_HUB_SIGNATURE"], 2) + array('', '');
 
 if ($hash == hash_hmac("sha1", $rawPost, "g5jyu78")) {
 	$hook = json_decode($rawPost);
 	$lastcommit = $hook->commits[count($hook->commits) - 1];
 	if (strstr($lastcommit->message, "Release")) {	
	 	shell_exec("cd /opt/openresty/nginx/html/app_ujupage_com/; git reset --hard; git pull 2>&1;");
 	}
 }
?>