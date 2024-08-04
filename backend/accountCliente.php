<?php
include 'connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: content-type");

if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
} else {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_GET['utenteID'])) {
            $utenteID = $_GET['utenteID'];

            $queryUtente = "SELECT nome, cognome, dataNascita, telefono, password FROM utente WHERE utente_id = ?";
            $stmtUtente = $conn->prepare($queryUtente);
            $stmtUtente->bind_param("i", $utenteID);
            $stmtUtente->execute();
            $resultUtente = $stmtUtente->get_result();

            if ($resultUtente->num_rows > 0) {
                $rowUtente = $resultUtente->fetch_assoc();

                $response = array(
                    'nome' => $rowUtente['nome'],
                    'cognome' => $rowUtente['cognome'],
                    'dataDiNascita' => $rowUtente['dataNascita'],
                    'telefono' => $rowUtente['telefono'],
                    'password' => $rowUtente['password'],
                    'ospiti' => array()
                );

                $queryOspiti = "SELECT nome, cognome, dataNascita FROM ospite WHERE utente_id = ?";
                $stmtOspiti = $conn->prepare($queryOspiti);
                $stmtOspiti->bind_param("i", $utenteID);
                $stmtOspiti->execute();
                $resultOspiti = $stmtOspiti->get_result();

                if ($resultOspiti->num_rows > 0) {
                    while ($rowOspite = $resultOspiti->fetch_assoc()) {
                        $response['ospiti'][] = array(
                            'nomeOspite' => $rowOspite['nome'],
                            'cognomeOspite' => $rowOspite['cognome'],
                            'dataNascitaOspite' => $rowOspite['dataNascita']
                        );
                    }
                }

                echo json_encode($response);
            } else {
                echo json_encode(array('error' => 'Nessun utente trovato con l\'ID specificato'));
            }

            $stmtUtente->close();
            $stmtOspiti->close();
            $conn->close();
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $eData = file_get_contents("php://input");
        $dData = json_decode($eData, true);

        if (isset($_GET['utenteID'])) {
            $utenteID = $_GET['utenteID'];

            $telefono = $dData['telefono'];
            $queryCheckTelefono = "SELECT * FROM utente WHERE utente_id != ? AND telefono = ?";
            $stmtCheckTelefono = $conn->prepare($queryCheckTelefono);
            $stmtCheckTelefono->bind_param("is", $utenteID, $telefono);
            $stmtCheckTelefono->execute();
            $resultCheckTelefono = $stmtCheckTelefono->get_result();

            if ($resultCheckTelefono->num_rows > 0) {
                echo json_encode(array(
                    'success' => 'false',
                    'error' => 'Esiste già un altro utente con lo stesso numero di telefono'));
            } else {

                $queryUpdateUtente = "UPDATE utente SET nome = ?, cognome = ?, dataNascita = ?, telefono = ?, password = ? WHERE utente_id = ?";
                $stmtUpdateUtente = $conn->prepare($queryUpdateUtente);
                $stmtUpdateUtente->bind_param("sssssi", $dData['nome'], $dData['cognome'], $dData['dataDiNascita'], $dData['telefono'], $dData['password'], $utenteID);
                $stmtUpdateUtente->execute();

                if ($stmtUpdateUtente->affected_rows > 0) {
                    echo json_encode(array(
                        'success' => 'true',
                        'message' => 'Dati dell\'utente aggiornati con successo'));
                } else {
                    echo json_encode(array(
                        'success' => 'false',
                        'error' => 'Nessun dato dell\'utente aggiornato, controllo i dati inviati e riprova'));
                }

                $stmtUpdateUtente->close();
            }

            $stmtCheckTelefono->close();
            $conn->close();
        }
    }
}
?>
