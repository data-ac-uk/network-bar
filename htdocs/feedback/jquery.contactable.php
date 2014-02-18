<?php

session_start();

$sessionid = session_id();

header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); 

header("content-type:application/javascript");
echo "var feedback_sessionid = '$sessionid';\n\n";
readfile("jquery.contactable.js");

