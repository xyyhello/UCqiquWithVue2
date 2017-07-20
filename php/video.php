<?php
	$page = $_GET["page"];

	if($page <= 2){
		$content = file_get_contents("video/video.txt");
	}else{
		$content = '{"data":[]}';
	}

	echo $content;
?>