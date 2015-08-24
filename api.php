<?php
//Llamamiento a la api de Google de reCaptcha      
$secret = "6LeNvAsTAAAAAAIpvQqU6Q8oZkHft4ldCbdtQZKY"; // private key
$response = $_POST['response'];
$json = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=$response");
$rtn = json_decode($json); 
header("Content-Type: application/json;charset=utf-8");
print json_encode($rtn);    
?>