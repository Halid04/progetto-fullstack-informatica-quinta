<?php
include 'connect.php';

header("Access-Control-Allow-Origin: *");
header(("Access-Control-Allow-Methods: GET, POST"));
header(("Access-Control-Allow-Headers: content-type"));

if (mysqli_connect_error()) {
    echo json_encode(array('success' => false, 'message' => 'Connessione al database fallita: ' . mysqli_connect_error()));
    exit();
} else {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $eData = file_get_contents("php://input");
        $dData = json_decode($eData, true);

        $userName = $dData['userName'];
        $userSurname = $dData['userSurname'];
        $userBirthdate = $dData['userBirthdate'];
        $userPhoneNumber = $dData['userPhoneNumber'];
        $userPassword = $dData['userPassword'];
        $userRuolo = "cliente";

        $query = "SELECT * FROM utente WHERE telefono = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $userPhoneNumber);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $response = array('success' => false, 'message' => "Il numero di telefono inserito è già stato registrato.");
            echo json_encode($response);
            exit();
        } else {
            $query = "SELECT * FROM utente WHERE nome = ? AND cognome = ? AND dataNascita = ? AND password = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("ssss", $userName, $userSurname, $userBirthdate, $userPassword);
            $stmt->execute();
            $result = $stmt->get_result();

            
            if ($result->num_rows > 0) {
                $response = array('success' => false, 'message' => "Utente già registrato. Puoi aggiornare i tuoi dati o procedere con l'accesso.");
                echo json_encode($response);
                exit();
            } else {
                $query = "INSERT INTO utente (nome, cognome, dataNascita, password, telefono, ruolo) VALUES (?, ?, ?, ?, ?, ?)";
                $stmt = $conn->prepare($query);
                $stmt->bind_param("ssssss", $userName, $userSurname, $userBirthdate, $userPassword, $userPhoneNumber, $userRuolo);

                if ($stmt->execute()) {
                    echo json_encode(array('success' => true, 'message' => 'Registrazione completata con successo'));
                } else {
                    echo json_encode(array('success' => false, 'message' => 'Si è verificato un errore durante la registrazione'));
                }
            }
        }

        $stmt->close();
        $conn->close();
    }
}
