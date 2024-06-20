<?php
date_default_timezone_set('America/Sao_Paulo');

if (isset($_GET['userId'])) {
    $userId = $_GET['userId'];

    require '../banco.php';

    $conn = new mysqli($host, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Conexão falhou: " . $conn->connect_error);
    }

    $sql = "SELECT d.*, c.imagem AS foto 
            FROM despesas AS d 
            INNER JOIN categorias AS c ON (c.nome = d.categoria) 
            WHERE apagado = 0 AND status = 0 AND id = ? 
            ORDER BY data_vencimento ASC";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param('i', $userId);
        
        $stmt->execute();
        
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $response = array();

            while ($row = $result->fetch_assoc()) {
                if (isset($row['idcategorias'])) {
                    $row['idcategorias'] = intval($row['idcategorias']);
                }
                $response[] = $row;
            }

            header('Content-Type: application/json');
            echo json_encode($response, JSON_PRETTY_PRINT);
        } else {
            $response = array('success' => false, 'message' => 'Nenhuma despesa encontrada.');
            header('Content-Type: application/json');
            echo json_encode($response, JSON_PRETTY_PRINT);
        }

        $stmt->close();
    } else {
        $response = array('success' => false, 'message' => 'Nenhuma despesa encontrada.');
        header('Content-Type: application/json');
        echo json_encode($response, JSON_PRETTY_PRINT);
    }

    $conn->close();
} else {
    $response = array('success' => false, 'message' => 'Nenhuma despesa encontrada.');
    header('Content-Type: application/json');
    echo json_encode($response, JSON_PRETTY_PRINT);
}
?>
