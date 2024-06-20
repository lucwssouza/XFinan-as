<?php
date_default_timezone_set('America/Sao_Paulo');

if (isset($_GET['userId'])) {
    $userId = $_GET['userId'];

    require '../banco.php'; 

    try {
        $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT saldo FROM usuario WHERE idusuario = :userId";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':userId', $userId);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            $response = array('success' => true, 'saldo' => $user['saldo']);
        } else {
            $response = array('success' => false, 'message' => 'Usuário não encontrado');
        }
        echo json_encode($response);
    } catch (PDOException $e) {
        $response = array('success' => false, 'message' => 'Erro ao obter saldo: ' . $e->getMessage());
        echo json_encode($response);
    }
} else {
    $response = array('success' => false, 'message' => 'Parâmetros GET incompletos');
    echo json_encode($response);
}
?>
