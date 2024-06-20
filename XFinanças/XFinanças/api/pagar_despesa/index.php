<?php
date_default_timezone_set('America/Sao_Paulo');

$datax = json_decode(file_get_contents('php://input'), true);

$token = $datax['token'];

if (isset($token) && isset($datax['users'])) {
    if (!empty($token)) {
        if ($token === 'Q!W@ee344%%R') {
            require '../banco.php';

            $despesa = $datax['despesa'];
            $iddespesas = $datax['iddespesas'];
            $userId = $datax['users'];
            $valorDespesa = $despesa['valor']; 

            try {
                $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


                $sqlUpdateDespesa = "UPDATE despesas SET status = 1 WHERE iddespesas = :iddespesas limit 1;";
                $stmtUpdateDespesa = $pdo->prepare($sqlUpdateDespesa);
                $stmtUpdateDespesa->bindParam(':iddespesas', $iddespesas);
                $stmtUpdateDespesa->execute();


                $sqlSelectSaldo = "SELECT saldo FROM usuario WHERE idusuario = :idusuario;";
                $stmtSelectSaldo = $pdo->prepare($sqlSelectSaldo);
                $stmtSelectSaldo->bindParam(':idusuario', $userId);
                $stmtSelectSaldo->execute();
                $saldoAtual = $stmtSelectSaldo->fetchColumn();

                if ($saldoAtual !== false) {

                    $novoSaldo = $saldoAtual - $valorDespesa;
                    $sqlUpdateSaldo = "UPDATE usuario SET saldo = :novoSaldo WHERE idusuario = :idusuario;";
                    $stmtUpdateSaldo = $pdo->prepare($sqlUpdateSaldo);
                    $stmtUpdateSaldo->bindParam(':novoSaldo', $novoSaldo);
                    $stmtUpdateSaldo->bindParam(':idusuario', $userId);
                    $stmtUpdateSaldo->execute();

                    $response = array('success' => true, 'message' => 'Despesa paga com sucesso');
                    echo json_encode($response);
                } else {
                    $response = array('success' => false, 'message' => 'Erro ao recuperar saldo do usuário');
                    echo json_encode($response);
                }
            } catch (PDOException $e) {
                $response = array('success' => false, 'message' => 'Erro ao pagar despesa: ' . $e->getMessage());
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
} else {
    $response = array('success' => false, 'message' => 'Dados inválidos');
    echo json_encode($response);
}
?>
