<?php
include 'connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: content-type");

if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
} else {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $eData = file_get_contents("php://input");
        $dData = json_decode($eData, true);

        $userName = $dData['userName'];
        $userSurname = $dData['userSurname'];
        $userPassword = $dData['userPassword'];

        $query = "SELECT * FROM utente WHERE nome = ? AND cognome = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ss", $userName, $userSurname);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $query2 = "SELECT * FROM utente WHERE nome = ? AND cognome = ? AND password = ?";
            $stmt2 = $conn->prepare($query2);
            $stmt2->bind_param("sss", $userName, $userSurname, $userPassword);
            $stmt2->execute();
            $result2 = $stmt2->get_result();
            if ($result2->num_rows > 0) {
                $row = $result->fetch_assoc();
                $userId = $row['utente_id']; 

                $queryRole = "SELECT ruolo FROM utente WHERE utente_id = ?";
                $stmtRole = $conn->prepare($queryRole);
                $stmtRole->bind_param("i", $userId);
                $stmtRole->execute();
                $resultRole = $stmtRole->get_result();
                $rowRole = $resultRole->fetch_assoc();



                $response = array(
                    'success' => true,
                    'message' => 'Login effettuato con successo',
                    'login' => true,
                    'id' => $userId, 
                    'nome' => $row['nome'],
                    'cognome' => $row['cognome'],
                    'admin' => $rowRole['ruolo'] == "admin" ? true : false 
                );
            } else {
                $response = array('success' => false, 'message' => 'La password inserita non è corretta', 'login' => false);
            }
        } else {
            $response = array('success' => false, 'message' => 'Utente non trovato. Assicurati di aver inserito correttamente nome e cognome', 'login' => false);
        }

        echo json_encode($response);

        $stmt->close();
        $conn->close();
    }
}
