<?php
date_default_timezone_set('America/Sao_Paulo');

if (isset($_GET['userId']) && isset($_GET['nomecategoria'])) {
    $userId = $_GET['userId'];
    $nomecategoria = $_GET['nomecategoria'];

    require '../banco.php';

    $conn = new mysqli($host, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Conexão falhou: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM despesas WHERE categoria = ? AND apagado = 0 AND status = 0 AND id = ?";


    $stmt = $conn->prepare($sql);

    if ($stmt === false) {

        $response = array('success' => false, 'message' => 'Erro na preparação da query: ' . $conn->error);
        header('Content-Type: application/json');
        echo json_encode($response, JSON_PRETTY_PRINT);
        exit;
    }


    $stmt->bind_param('si', $nomecategoria, $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $response = array();

        while ($row = $result->fetch_assoc()) {
            $row['iddespesas'] = intval($row['iddespesas']);
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
    $conn->close();
} else {
    echo json_encode(array("message" => "Parâmetros GET incompletos."));
}
?>
