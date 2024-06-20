<?php
date_default_timezone_set('America/Sao_Paulo');

$datax = json_decode(file_get_contents('php://input'), true);

$token = $datax['token'];

if (isset($token)) {
    if (!empty($token)) {
        if ($token === 'Q!W@ee344%%R') {
            require '../banco.php';
            
            $despesa = $datax['despesa'];
            $iddespesas = $datax['iddespesas'];
            $userId = $datax['users']; 

            try {
                $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $sql = "UPDATE despesas SET apagado = 1 WHERE iddespesas = :iddespesas limit 1;";
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':iddespesas', $iddespesas);
                $stmt->execute();

                $response = array('success' => true, 'message' => 'Despesa paga com sucesso');
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
