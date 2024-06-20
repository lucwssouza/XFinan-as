<?php
date_default_timezone_set('America/Sao_Paulo');

$datax = json_decode(file_get_contents('php://input'), true);

$token = $datax['token'];

if (isset($token)) {
    if (!empty($token)) {
        if ($token === 'Q!W@ee344%%R') {
            require '../banco.php';

            try {
                $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $data_cadastro = date('Y-m-d');

                $nome = $datax['nome'];
                $valor = $datax['valor'];
                $observacao = $datax['observacao'];
                $categoria = $datax['categoriaNome'];
                $dataVencimento = $datax['dataVencimento'];
                $id = $datax['userId'];

                $stmt_check = $pdo->prepare("SELECT COUNT(*) FROM despesas WHERE nome = :nome AND id = :id AND status = 0 AND apagado = 0");
                $stmt_check->bindParam(':nome', $nome);
                $stmt_check->bindParam(':id', $id);
                $stmt_check->execute();
                $count = $stmt_check->fetchColumn();

                if ($count > 0) {
                    $response = array('success' => false, 'message' => 'Esta despesa já está cadastrada para este usuário');
                    echo json_encode($response);
                } else {

                    $sql = "INSERT INTO despesas (nome, valor, observacao, categoria, status, apagado, data_vencimento, data_cadastro, id) VALUES (:nome, :valor, :observacao, :categoria, 0, 0, :dataVencimento, :data_cadastro, :id)";
                    $stmt = $pdo->prepare($sql);
                    $stmt->bindParam(':nome', $nome);
                    $stmt->bindParam(':valor', $valor);
                    $stmt->bindParam(':observacao', $observacao);
                    $stmt->bindParam(':categoria', $categoria);
                    $stmt->bindParam(':dataVencimento', $dataVencimento);
                    $stmt->bindParam(':data_cadastro', $data_cadastro);
                    $stmt->bindParam(':id', $id);
                    $stmt->execute();

                    $response = array('success' => true, 'message' => 'Despesa cadastrada com sucesso');
                    echo json_encode($response);
                }
            } catch (PDOException $e) {
                $response = array('success' => false, 'message' => 'Erro ao salvar: ' . $e->getMessage());
                echo json_encode($response);
            }
        } else {
            $response = array('success' => false, 'message' => 'Token inválido');
            echo json_encode($response);
        }
    }
} else {
    $response = array('success' => false, 'message' => 'Token não enviado');
    echo json_encode($response);
}
?>
