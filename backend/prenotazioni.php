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

            // Ottieni il ruolo dell'utente
            $queryRuolo = "SELECT ruolo FROM utente WHERE utente_id = ?";
            $stmtRuolo = $conn->prepare($queryRuolo);
            $stmtRuolo->bind_param("i", $utenteID);
            $stmtRuolo->execute();
            $resultRuolo = $stmtRuolo->get_result();
            $rowRuolo = $resultRuolo->fetch_assoc();
            $ruolo = $rowRuolo['ruolo'];

            // Query per ottenere le prenotazioni in base al ruolo dell'utente
            if ($ruolo === 'admin') {
                $query = "SELECT u.nome, u.cognome, c.nomeCamera, c.tipoCamera, c.postiLetto, pr.dataInizioSoggiorno, pr.dataFineSoggiorno, pr.stato, pr.prenotazione_id
                          FROM prenotazione pr
                          JOIN associare a ON pr.prenotazione_id = a.prenotazione_id
                          JOIN camera c ON a.numeroCamera = c.numeroCamera
                          JOIN utente u ON pr.utente_id = u.utente_id";
                $stmt = $conn->prepare($query);
            } else {
                $query = "SELECT c.nomeCamera, c.tipoCamera, c.postiLetto, pr.prenotazione_id, pr.dataInizioSoggiorno, pr.dataFineSoggiorno, pr.stato, pr.prenotazione_id
                          FROM prenotazione pr
                          JOIN associare a ON pr.prenotazione_id = a.prenotazione_id
                          JOIN camera c ON a.numeroCamera = c.numeroCamera
                          WHERE pr.utente_id = ?";
                $stmt = $conn->prepare($query);
                $stmt->bind_param("i", $utenteID);
            }

            $stmt->execute();
            $result = $stmt->get_result();

            $prenotazioni = array();

            // Organizza i dati delle prenotazioni nella struttura desiderata
            while ($row = $result->fetch_assoc()) {
                $prenotazione = array(
                    "nomeCamera" => $row['nomeCamera'],
                    "tipoCamera" => $row['tipoCamera'],
                    "postiLetto" => $row['postiLetto'],
                    "dataInizioSoggiorno" => $row['dataInizioSoggiorno'],
                    "dataFineSoggiorno" => $row['dataFineSoggiorno'],
                    "statoPrenotazione" => $row['stato'],
                    "prenotazione_id" => $row['prenotazione_id'],
                    "pasti" => array(),
                    "ospiti" => array()
                );

                // Se l'utente è admin, aggiungi il nome e cognome dell'utente che ha effettuato la prenotazione
                if ($ruolo === 'admin') {
                    $prenotazione['nome'] = $row['nome'];
                    $prenotazione['cognome'] = $row['cognome'];
                }

                // Query per ottenere i pasti associati alla prenotazione corrente
                $queryPasti = "SELECT tipoPasto, dataPasto FROM pasto WHERE prenotazione_id = ?";
                $stmtPasti = $conn->prepare($queryPasti);
                $stmtPasti->bind_param("i", $row['prenotazione_id']);
                $stmtPasti->execute();
                $resultPasti = $stmtPasti->get_result();

                // Aggiungi i pasti alla prenotazione corrente
                while ($rowPasti = $resultPasti->fetch_assoc()) {
                    $pasto = array(
                        "tipoPasto" => $rowPasti['tipoPasto'],
                        "dataPasto" => $rowPasti['dataPasto']
                    );
                    $prenotazione['pasti'][] = $pasto;
                }

                // Query per ottenere gli ospiti associati alla prenotazione corrente
                $queryOspiti = "SELECT nome, cognome FROM ospite WHERE prenotazione_id = ?";
                $stmtOspiti = $conn->prepare($queryOspiti);
                $stmtOspiti->bind_param("i", $row['prenotazione_id']);
                $stmtOspiti->execute();
                $resultOspiti = $stmtOspiti->get_result();

                // Aggiungi gli ospiti alla prenotazione corrente
                while ($rowOspiti = $resultOspiti->fetch_assoc()) {
                    $ospite = array(
                        "nomeOspite" => $rowOspiti['nome'],
                        "cognomeOspite" => $rowOspiti['cognome']
                    );
                    $prenotazione['ospiti'][] = $ospite;
                }

                $prenotazioni[] = $prenotazione;
            }

            // Restituisci i dati delle prenotazioni come JSON al frontend
            echo json_encode($prenotazioni);

            // Chiudi le dichiarazioni e la connessione al database
            $stmt->close();
            $stmtPasti->close();
            $stmtOspiti->close();
            $stmtRuolo->close();
            $conn->close();
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_GET['prenotazioneID']) && isset($_GET['action']) && $_GET['action'] === "eliminaPrenotazione") {
            $prenotazioneID = $_GET['prenotazioneID'];

            // Inizia la transazione
            $conn->begin_transaction();

            try {
                // Aggiorna la disponibilità della camera a "libera"
                $queryUpdateCamera = "UPDATE camera SET disponibilita = 'libera' WHERE numeroCamera IN (SELECT numeroCamera FROM associare WHERE prenotazione_id = ?)";
                $stmtUpdateCamera = $conn->prepare($queryUpdateCamera);
                $stmtUpdateCamera->bind_param("i", $prenotazioneID);
                $stmtUpdateCamera->execute();
                $stmtUpdateCamera->close();

                // Cancella dalla tabella associare
                $queryCancAssociare = "DELETE FROM associare WHERE prenotazione_id = ?";
                $stmtCancAssociare = $conn->prepare($queryCancAssociare);
                $stmtCancAssociare->bind_param("i", $prenotazioneID);
                $stmtCancAssociare->execute();
                $stmtCancAssociare->close();

                // Cancella dalla tabella pasto
                $queryCancPasto = "DELETE FROM pasto WHERE prenotazione_id = ?";
                $stmtCancPasto = $conn->prepare($queryCancPasto);
                $stmtCancPasto->bind_param("i", $prenotazioneID);
                $stmtCancPasto->execute();
                $stmtCancPasto->close();

                // Cancella dalla tabella ospite
                $queryCancOspite = "DELETE FROM ospite WHERE prenotazione_id = ?";
                $stmtCancOspite = $conn->prepare($queryCancOspite);
                $stmtCancOspite->bind_param("i", $prenotazioneID);
                $stmtCancOspite->execute();
                $stmtCancOspite->close();

                // Cancella dalla tabella prenotazione
                $queryCancPrenotazione = "DELETE FROM prenotazione WHERE prenotazione_id = ?";
                $stmtCancPrenotazione = $conn->prepare($queryCancPrenotazione);
                $stmtCancPrenotazione->bind_param("i", $prenotazioneID);
                $stmtCancPrenotazione->execute();
                $stmtCancPrenotazione->close();

                // Conferma la transazione
                $conn->commit();

                echo json_encode(array('success' => true));
            } catch (Exception $e) {
                // Annulla la transazione in caso di errore
                $conn->rollback();
                echo json_encode(array('success' => false, 'error' => $e->getMessage()));
            }

            $conn->close();
        }
    }
}
