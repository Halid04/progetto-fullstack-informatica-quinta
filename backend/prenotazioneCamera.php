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
        if (isset($_GET['numeroCamera'])) {
            $numeroCamera = $_GET['numeroCamera'];

            // Query per ottenere i dati della camera
            $sql = "SELECT * FROM camera WHERE numeroCamera = $numeroCamera";
            $result = $conn->query($sql);


            // Query per ottenere le immagini correlate alla camera
            $sql2 = "SELECT nomeImmagineCamera FROM immagineCamera WHERE numeroCamera = $numeroCamera";
            $result2 = $conn->query($sql2);

            $response = array();

            if ($result->num_rows > 0) {
                // Ottieni i dati della camera
                $row = $result->fetch_assoc();
                $response['camera'] = array(
                    'numeroCamera' => $row['numeroCamera'],
                    'tipoCamera' => $row['tipoCamera'],
                    'postiLetto' => $row['postiLetto'],
                    'prezzo' => $row['prezzo'],
                    'disponibilita' => $row['disponibilita'],
                    'nomeCamera' => $row['nomeCamera'],
                    'descrizione' => $row['descrizione']
                );

                // Ottieni le immagini correlate alla camera
                $immagini = array();
                while ($row2 = $result2->fetch_assoc()) {
                    $immagini[] = $row2['nomeImmagineCamera'];
                }
                $response['camera']['immagini'] = $immagini;

                echo json_encode($response);
            } else {
                echo json_encode(array());
            }
        } else {
            echo "Parametro numeroCamera non specificato.";
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $eData = file_get_contents("php://input");
        $dData = json_decode($eData, true);

        // Recupera i dati inviati dal frontend
        $dataInizioSoggiorno = $dData['dataInizioSoggiorno'];
        $dataFineSoggiorno = $dData['dataFineSoggiorno'];
        $utente_id = $dData['utente_id'];
        $pasti = $dData['pasti']; // Un array di pasti
        $numeroCamera = $dData['numeroCamera'];
        $ospiti = $dData['ospiti']; // Un array di ospiti

        // Inserisci i dati nella tabella 'prenotazione'
        $queryPrenotazione = "INSERT INTO prenotazione (dataInizioSoggiorno, dataFineSoggiorno, utente_id) VALUES (?, ?, ?)";
        $stmtPrenotazione = $conn->prepare($queryPrenotazione);
        $stmtPrenotazione->bind_param("ssi", $dataInizioSoggiorno, $dataFineSoggiorno, $utente_id);
        $resultPrenotazione = $stmtPrenotazione->execute();

        if ($resultPrenotazione) {
            $lastPrenotazioneId = mysqli_insert_id($conn);

            $disponibilita = "occupata";

            $queryUpdateCameraDisponibilita = "UPDATE camera SET disponibilita = ? WHERE numeroCamera = ?";
            $stmtUpdateCameraDisponibilita = $conn->prepare($queryUpdateCameraDisponibilita);
            $stmtUpdateCameraDisponibilita->bind_param("si", $disponibilita, $numeroCamera);
            $stmtUpdateCameraDisponibilita->execute();

            // Inserisci i pasti nella tabella 'pasto' solo se l'array non è vuoto
            if (!empty($pasti)) {
                foreach ($pasti as $pasto) {
                    $tipoPasto = $pasto['tipoPasto'];
                    $dataPasto = $pasto['dataPasto'];
                    $queryPasto = "INSERT INTO pasto (tipoPasto, dataPasto, prenotazione_id) VALUES (?, ?, ?)";
                    $stmtPasto = $conn->prepare($queryPasto);
                    $stmtPasto->bind_param("ssi", $tipoPasto, $dataPasto, $lastPrenotazioneId);
                    $resultPasto = $stmtPasto->execute();
                }
            }

            // Inserisci gli ospiti nella tabella 'ospite' solo se l'array non è vuoto
            if (!empty($ospiti)) {
                foreach ($ospiti as $ospite) {
                    $nomeOspite = $ospite['nomeOspite'];
                    $cognomeOspite = $ospite['cognomeOspite'];
                    $dataNascitaOspite = $ospite['dataNascitaOspite'];
                    $queryOspite = "INSERT INTO ospite (nome, cognome, dataNascita, utente_id, prenotazione_id) VALUES (?, ?, ?, ?, ?)";
                    $stmtOspite = $conn->prepare($queryOspite);
                    $stmtOspite->bind_param("sssii", $nomeOspite, $cognomeOspite, $dataNascitaOspite, $utente_id, $lastPrenotazioneId);
                    $resultOspite = $stmtOspite->execute();
                }
            }

            // Inserisci l'associazione tra la camera e la prenotazione nella tabella 'associare'
            $queryAssociare = "INSERT INTO associare (numeroCamera, prenotazione_id) VALUES (?, ?)";
            $stmtAssociare = $conn->prepare($queryAssociare);
            $stmtAssociare->bind_param("ii", $numeroCamera, $lastPrenotazioneId);
            $resultAssociare = $stmtAssociare->execute();

            // Controlla se tutte le query sono state eseguite con successo
            if ($resultPrenotazione && $resultAssociare) {
                echo json_encode(array("success" => true));
            } else {
                echo json_encode(array("success" => false, "message" => "Errore durante l'inserimento dei dati"));
            }
        } else {
            echo json_encode(array("success" => false, "message" => "Errore durante l'inserimento dei dati"));
        }

        // Chiudi la dichiarazione e la connessione al database
        $stmtPrenotazione->close();
        $stmtUpdateCameraDisponibilita->close();
        if (!empty($pasti)) {
            $stmtPasto->close();
        }
        if (!empty($ospiti)) {
            $stmtOspite->close();
        }
        $stmtAssociare->close();
        $conn->close();
    }
}

