<?php
sleep(1);

if(isset($_REQUEST['SESSID']))
	session_id($_REQUEST['SESSID']);
	
session_start();

header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); 

header("content-type:application/javascript");


$log = var_export($_REQUEST, true);
file_put_contents("/tmp/feedback",date("r")."\n{$log}",FILE_APPEND);

$jsonp = false;
if ( isset( $_GET[ 'callback' ] ) ) {
    $_GET[ 'callback' ] = strip_tags( $_GET[ 'callback' ] );
    $jsonp              = true;

    $pre  = $_GET[ 'callback' ] . '(';
    $post = ');';
} //isset( $_GET[ 'callback' ] )


$jsona = array( 'response' => 'fail');

$fieldpass = true;

$incoms = array(
	"name"=>array("From: ", true),
	"email"=>array("eMail: ", true),
	"message"=>array("Message:\n", true),
	"exp"=>array("\n\nExperience: ", false),
	"productKey"=>array("WebSite: ", false),
	"page"=>array("PageURL: ", false),
	);
$txt = "";
foreach($incoms as $k=>$v){
	$txt .= "{$v[0]}{$_REQUEST[$k]}\n";
	if($v[1] && (!isset($_REQUEST[$k]) || empty($_REQUEST[$k]))){
		$fieldpass = false;
	}
}


if (empty($_SESSION['captcha']) || trim(strtolower($_REQUEST['captcha'])) != $_SESSION['captcha']) {
	$jsona = array( 'response' => 'captcha');
}elseif(!$fieldpass){
	$jsona = array( 'response' => 'error');
}else{
	
$email = <<<END
{$txt}

END;

mail ( "andy@data.ac.uk", "WEBSITE FEEDBACK", $email);

$jsona = array( 'response' => 'success');

}


/* Encode JSON, and if jsonp is true, then ouput with the callback
 ** function; if not - just output JSON. */
$json = json_encode( $jsona );

print( ( $jsonp ) ? $pre . $json . $post : $json );




exit();
echo 'var contactable_result = "success";';


exit();

include("admin/config.php");
include("admin/functions.php");

if (empty($_SESSION['captcha']) || trim(strtolower($_REQUEST['captcha'])) != $_SESSION['captcha']) {
	echo 'var contactable_result = "captcha";';
}else{

$incoms = array(
	"productKey"=>array("feed_key", true),
	"name"=>array("feed_name", true),
	"email"=>array("feed_email", true),
	"message"=>array("feed_msg", true),
	"exp"=>array("feed_exp", false),
	);

foreach($incoms as $k=>$v){
	if($v[1] && !$_REQUEST[$k])	die('var contactable_result = "error";');
	$input[$v[0]] = $_REQUEST[$k];
}

$input['feed_ip'] = $_SERVER['REMOTE_ADDR'];
$input['feed_host'] = gethostbyaddr($_SERVER['REMOTE_ADDR']);
$input['feed_agent'] = $_SERVER['HTTP_USER_AGENT'];
$input['feed_referer'] = $_SERVER['HTTP_REFERER'];

lib_mysqli_insert("notes", $input, array("feed_time"=>"NOW()"));
echo 'var contactable_result = "success";';
}





?>