<?php
require '../banco.php';

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

$email = $_GET['email'];
$senha = $_GET['senha'];

$sql = "SELECT idusuario, nome, email FROM `usuario` WHERE `email`='$email' AND `senha`='$senha' LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $usuario = $result->fetch_assoc();
    header('Content-Type: application/json');
    echo json_encode($usuario, JSON_PRETTY_PRINT);
} else {
    echo json_encode(["error" => "Email ou senha incorretos"]);
}

// Fecha a conexão com o banco de dados
$conn->close();
?>
