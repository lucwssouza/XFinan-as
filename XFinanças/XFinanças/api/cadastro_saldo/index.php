<?php
date_default_timezone_set('America/Sao_Paulo');

$datax = json_decode(file_get_contents('php://input'), true);

$token = $datax['token'];

if (isset($token)) {
    if (!empty($token)) {
        if ($token === 'Q!W@ee344%%R') {
            require '../banco.php';
            
            $saldo = $datax['saldo'];
            $userId = $datax['users']; 

            try {
                $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $sql = "UPDATE usuario SET saldo = :saldo WHERE idusuario = :userId limit 1;";
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':userId', $userId);
                $stmt->bindParam(':saldo', $saldo);
                $stmt->execute();

                $response = array('success' => true, 'message' => 'Saldo cadastrado com sucesso');
                echo json_encode($response);
            } catch (PDOException $e) {
                $response = array('success' => false, 'message' => 'Erro ao salvar: ' . $e->getMessage());
                echo json_encode($response);
            }
        } else {
            $response = array('success' => false, 'message' => 'Token inválido');
            echo json_encode($response);
        }
    } else {
        $response = array('success' => false, 'message' => 'Token não enviado');
        echo json_encode($response);
    }
}
?>
