<?php
date_default_timezone_set('America/Sao_Paulo');

// Obtém o conteúdo do corpo da solicitação
$datax = json_decode(file_get_contents('php://input'), true);

$token = $datax['token'];

if (isset($token)) {
    if (!empty($token)) {
        if ($token === 'Q!W@ee344%%R') {
            require '../banco.php';

            try {
                $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                // Extrai os dados da categoria do corpo da solicitação
                $nome = $datax['nome'];
                $imagem = $datax['imagem'];

                // Verifica se a categoria já existe
                $stmt_check = $pdo->prepare("SELECT COUNT(*) FROM categorias WHERE nome = :nome");
                $stmt_check->bindParam(':nome', $nome);
                $stmt_check->execute();
                $count = $stmt_check->fetchColumn();

                if ($count > 0) {
                    $response = array('success' => false, 'message' => 'Esta categoria já está cadastrada');
                    echo json_encode($response);
                } else {
                    // Insere a categoria na tabela 'categorias'
                    $sql = "INSERT INTO categorias(nome, imagem) VALUES (:nome, :imagem)";
                    $stmt = $pdo->prepare($sql);
                    $stmt->bindParam(':nome', $nome);
                    $stmt->bindParam(':imagem', $imagem);
                    $stmt->execute();

                    $response = array('success' => true, 'message' => 'Categoria cadastrada com sucesso');
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
