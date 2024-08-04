<?php
$servername = "localhost"; 
$username = "root"; 
$password = "password"; 
$dbname = "halid_and_co"; 


$conn = new mysqli('localhost', 'root', '', 'halid_and_co');


if ($conn->connect_error) {
    die("Connessione al database fallita: " . $conn->connect_error);
}
?>
