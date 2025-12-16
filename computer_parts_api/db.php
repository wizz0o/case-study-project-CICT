<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "computer_parts_inventory";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>