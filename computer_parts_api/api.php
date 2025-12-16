<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

// Include the database connection
include 'db.php';   // <-- Make sure this path is correct

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case "GET":
        $result = $conn->query("SELECT * FROM parts");
        $parts = [];
        while($row = $result->fetch_assoc()) {
            $parts[] = $row;
        }
        echo json_encode($parts);
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"));
        $stmt = $conn->prepare("INSERT INTO parts (name, type, quantity) VALUES (?, ?, ?)");
        $stmt->bind_param("ssi", $data->name, $data->type, $data->quantity);
        $stmt->execute();
        echo json_encode(["message"=>"Part added successfully"]);
        break;

    case "PUT":
        $data = json_decode(file_get_contents("php://input"));
        $stmt = $conn->prepare("UPDATE parts SET name=?, type=?, quantity=? WHERE id=?");
        $stmt->bind_param("ssii", $data->name, $data->type, $data->quantity, $data->id);
        $stmt->execute();
        echo json_encode(["message"=>"Part updated successfully"]);
        break;

    case "DELETE":
        $data = json_decode(file_get_contents("php://input"));
        $stmt = $conn->prepare("DELETE FROM parts WHERE id=?");
        $stmt->bind_param("i", $data->id);
        $stmt->execute();
        echo json_encode(["message"=>"Part deleted successfully"]);
        break;
}
?>