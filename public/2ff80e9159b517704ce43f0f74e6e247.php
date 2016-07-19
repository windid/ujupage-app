<?php
// ini_set('display_errors','on');
// if (isset($_POST["hook"])) {
// 	$hook = json_decode($_POST["hook"]);
// 	if ($hook->password != "e6e247") {
// 		die("ERROR!");
// 	}

// 	$lastcommit = $hook->push_data->commits[count($hook->push_data->commits) - 1];
// 	if (strstr($lastcommit->message, "Release")) {	
	 	echo shell_exec("cd /opt/openresty/nginx/html/app_ujupage_com/; git pull 2>&1;");
	 	echo shell_exec("composer --version 2>&1;"); 
// 	}
// }
?>