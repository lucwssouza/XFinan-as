<?php
$userId = $_GET['userId'];
require '../banco.php';

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

$sql = "SELECT
    c.idcategorias,
    c.nome AS categoria,
    IFNULL(COUNT(d.iddespesas), 0) AS total_despesas,
    IFNULL(SUM(d.valor), 0) AS total_valor_despesas,
    c.imagem
FROM
    categorias c
LEFT JOIN
    despesas d ON c.nome = d.categoria AND d.id = ? and d.apagado = 0 and d.status = 0
GROUP BY
    c.idcategorias, c.nome
ORDER BY
    c.idcategorias";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    die('Erro ao preparar a declaração SQL: ' . $conn->error);
}

$stmt->bind_param('i', $userId);

$stmt->execute();


$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $response = array();

    while ($row = $result->fetch_assoc()) {

        $row['idcategorias'] = intval($row['idcategorias']);
        $response[] = $row;
    }


    header('Content-Type: application/json');
    echo json_encode($response, JSON_PRETTY_PRINT);
} else {
    echo "Nenhuma categoria encontrada para o usuário com id " . $userId;
}

$stmt->close();
$conn->close();
?>
