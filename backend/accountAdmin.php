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
                    'camere' => array(),
                    'utenti' => array(),
                    'dashboard' => array(),
                    'incassiMensili' => array(),
                );

                $queryCamere = "SELECT * FROM camera";
                $resultCamere = $conn->query($queryCamere);

                if ($resultCamere->num_rows > 0) {
                    while ($rowCamere = $resultCamere->fetch_assoc()) {
                        $response['camere'][] = array(
                            'nomeCamera' => $rowCamere['nomeCamera'],
                            'tipoCamera' => $rowCamere['tipoCamera'],
                            'postiLetto' => $rowCamere['postiLetto'],
                            'prezzo' => $rowCamere['prezzo'],
                            'numeroCamera' => $rowCamere['numeroCamera'],
                            'descrizioneCamera' => $rowCamere['descrizione'],
                            'disponibilita' => $rowCamere['disponibilita']
                        );
                    }
                }

                $queryUtenti = "SELECT * FROM utente";
                $resultUtenti = $conn->query($queryUtenti);

                if ($resultUtenti->num_rows > 0) {
                    while ($rowUtenti = $resultUtenti->fetch_assoc()) {
                        $response['utenti'][] = array(
                            'nomeUtente' => $rowUtenti['nome'],
                            'cognomeUtente' => $rowUtenti['cognome'],
                            'IDUtente' => $rowUtenti['utente_id'],
                            'ruoloUtente' => $rowUtenti['ruolo'],
                            'dataNascitaUtente' => $rowUtenti['dataNascita'],
                            'telefonoUtente' => $rowUtenti['telefono'],
                            'passwordUtente' => $rowUtenti['password']
                        );
                    }
                }

                $queryNumUtenti = "SELECT COUNT(*) as numUtenti FROM utente";
                $resultNumUtenti = $conn->query($queryNumUtenti);
                $numUtenti = $resultNumUtenti->fetch_assoc()['numUtenti'];

                $queryNumCamere = "SELECT COUNT(*) as numCamere FROM camera";
                $resultNumCamere = $conn->query($queryNumCamere);
                $numCamere = $resultNumCamere->fetch_assoc()['numCamere'];

                $queryNumPrenotazioni = "SELECT COUNT(*) as numPrenotazioni FROM prenotazione";
                $resultNumPrenotazioni = $conn->query($queryNumPrenotazioni);
                $numPrenotazioni = $resultNumPrenotazioni->fetch_assoc()['numPrenotazioni'];

                $queryIncassiTotali = "
                SELECT SUM(c.prezzo * DATEDIFF(p.dataFineSoggiorno, p.dataInizioSoggiorno)) as incassiTotali
                FROM camera c
                JOIN associare a ON c.numeroCamera = a.numeroCamera
                JOIN prenotazione p ON a.prenotazione_id = p.prenotazione_id
            ";
                $resultIncassiTotali = $conn->query($queryIncassiTotali);
                $incassiTotali = $resultIncassiTotali->fetch_assoc()['incassiTotali'];

                $response['dashboard'] = array(
                    'numUtenti' => $numUtenti,
                    'numCamere' => $numCamere,
                    'numPrenotazioni' => $numPrenotazioni,
                    'incassiTotali' => $incassiTotali
                );

                $queryIncassiMensili = "
                SELECT
                    DATE_FORMAT(p.dataInizioSoggiorno, '%Y-%m') AS mese,
                    SUM(c.prezzo * DATEDIFF(p.dataFineSoggiorno, p.dataInizioSoggiorno)) AS incassoMensile
                FROM
                    camera c
                JOIN
                    associare a ON c.numeroCamera = a.numeroCamera
                JOIN
                    prenotazione p ON a.prenotazione_id = p.prenotazione_id
                GROUP BY
                    DATE_FORMAT(p.dataInizioSoggiorno, '%Y-%m')
                ORDER BY
                    mese
            ";
                $resultIncassiMensili = $conn->query($queryIncassiMensili);

                if ($resultIncassiMensili->num_rows > 0) {
                    while ($rowIncassiMensili = $resultIncassiMensili->fetch_assoc()) {
                        $response['incassiMensili'][] = array(
                            'mese' => $rowIncassiMensili['mese'],
                            'incassoMensile' => $rowIncassiMensili['incassoMensile']
                        );
                    }
                }

                echo json_encode($response);
            } else {
                echo json_encode(array('error' => 'Nessun utente trovato con l\'ID specificato'));
            }

            $stmtUtente->close();
            $conn->close();
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $eData = file_get_contents("php://input");
        $dData = json_decode($eData, true);

        if (isset($_GET['utenteID']) &&  isset($_GET['action']) && $_GET['action'] === "updateDatiUtente") {

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
                    'error' => 'Esiste già un altro utente con lo stesso numero di telefono'
                ));
            } else {

                $queryUpdateUtente = "UPDATE utente SET nome = ?, cognome = ?, dataNascita = ?, telefono = ?, password = ? WHERE utente_id = ?";
                $stmtUpdateUtente = $conn->prepare($queryUpdateUtente);
                $stmtUpdateUtente->bind_param("sssssi", $dData['nome'], $dData['cognome'], $dData['dataDiNascita'], $dData['telefono'], $dData['password'], $utenteID);
                $stmtUpdateUtente->execute();

                if ($stmtUpdateUtente->affected_rows > 0) {
                    echo json_encode(array(
                        'success' => 'true',
                        'message' => 'Dati dell\'utente aggiornati con successo'
                    ));
                } else {
                    echo json_encode(array(
                        'success' => 'false',
                        'error' => 'Nessun dato dell\'utente aggiornato, controllo i dati inviati e riprova'
                    ));
                }

                $stmtUpdateUtente->close();
            }

            $stmtCheckTelefono->close();
            $conn->close();
        }

        if (isset($_GET['action']) && $_GET['action'] === "AggiuntaCamera") {
            $eData = file_get_contents("php://input");
            $dData = json_decode($eData, true);

            $nomeCamera =  $dData['nomeCamera'];
            $tipoCamera =  $dData['tipoCamera'];
            $postiLetto =  $dData['postiLetto'];
            $prezzo =  $dData['prezzo'];
            $descrizione =  $dData['descrizione'];
            $disponibilita =  "libera";
            $immagineCamera =  $dData['immagineCamera'];


            $queryUltimoNumeroCamera = "SELECT MAX(numeroCamera) AS ultimoNumeroCamera FROM camera";
            $stmtUltimoNumeroCamera = $conn->prepare($queryUltimoNumeroCamera);
            $stmtUltimoNumeroCamera->execute();
            $resultUltimoNumeroCamera = $stmtUltimoNumeroCamera->get_result();

            if ($resultUltimoNumeroCamera->num_rows > 0) {
                $rowUltimoNumeroCamera = $resultUltimoNumeroCamera->fetch_assoc();
                $ultimoNumeroCamera = $rowUltimoNumeroCamera['ultimoNumeroCamera'];

                $nuovoNumeroCamera = $ultimoNumeroCamera + 1;
            } else {
                $nuovoNumeroCamera = 1;
            }

            $queryInsertCamera = "INSERT INTO camera (numeroCamera, tipoCamera, postiLetto, prezzo, disponibilita, nomeCamera, descrizione) VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmtInsertCamera = $conn->prepare($queryInsertCamera);
            $stmtInsertCamera->bind_param("isidsss", $nuovoNumeroCamera, $tipoCamera, $postiLetto, $prezzo, $disponibilita, $nomeCamera, $descrizione);
            $resultInsertCamera = $stmtInsertCamera->execute();

            if ($resultInsertCamera) {

                foreach ($immagineCamera as $nomeImmagineCamera) {
                    $queryInsertImmagineCamera = "INSERT INTO immagineCamera (numeroCamera, nomeImmagineCamera)
                         VALUES (?, ?)";
                    $stmtInsertImmagineCamera = $conn->prepare($queryInsertImmagineCamera);
                    $stmtInsertImmagineCamera->bind_param("is", $nuovoNumeroCamera, $nomeImmagineCamera);
                    $stmtInsertImmagineCamera->execute();
                }

                echo json_encode(array('success' => true, 'message' => 'Camera aggiunta con successo.'));
            } else {
                echo json_encode(array('success' => false, 'message' => 'Errore durante l\'aggiunta della camera.'));
            }

            $stmtInsertCamera->close();
            $stmtInsertImmagineCamera->close();
            $conn->close();
        }
    }
}
