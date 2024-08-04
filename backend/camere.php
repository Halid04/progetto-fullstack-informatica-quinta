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
        $query = "SELECT * FROM camera WHERE disponibilita = 'libera'";
        $result = $conn->query($query);

        $response = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $queryImage = "SELECT nomeImmagineCamera FROM immagineCamera WHERE numeroCamera = {$row['numeroCamera']} ORDER BY RAND() LIMIT 1";
                $resultImage = $conn->query($queryImage);
                $rowImage = $resultImage->fetch_assoc();


                $response[] = array(
                    'cameraTrovata' => true,
                    'numeroCamera' => $row['numeroCamera'],
                    'tipoCamera' => $row['tipoCamera'],
                    'postiLetto' => $row['postiLetto'],
                    'prezzo' => $row['prezzo'],
                    'disponibilita' => $row['disponibilita'],
                    'nomeCamera' => $row['nomeCamera'],
                    'descrizione' => $row['descrizione'],
                    'nomeImmagineCamera' => $rowImage['nomeImmagineCamera']
                );
            }

            echo json_encode($response);
        } else {
            echo json_encode(array('cameraTrovata' => false, 'message' => 'Nessuna camera trovata'));
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $eData = file_get_contents("php://input");
        $dData = json_decode($eData, true);

        $singola =  $dData['singola'];
        $doppia =  $dData['doppia'];
        $suite =  $dData['suite'];
        $postiLetto =  $dData['postiLetto'];
        $prezzo =  $dData['prezzo'];
        $checkInDate =  $dData['checkInDate'];
        $checkOutDate =  $dData['checkOutDate'];

        $query = "SELECT c.* FROM camera c 
              LEFT JOIN associare a ON c.numeroCamera = a.numeroCamera 
              LEFT JOIN prenotazione p ON a.prenotazione_id = p.prenotazione_id 
              WHERE c.tipoCamera IN (?, ?, ?) 
              AND c.postiLetto BETWEEN ? AND ? 
              AND c.prezzo BETWEEN ? AND ? 
              AND c.disponibilita = 'libera' 
              AND (
                  (p.dataInizioSoggiorno IS NULL AND p.dataFineSoggiorno IS NULL) OR 
                  NOT (? < p.dataInizioSoggiorno AND ? < p.dataInizioSoggiorno) OR 
                  NOT (? > p.dataFineSoggiorno AND ? > p.dataFineSoggiorno)
              )";

        $stmt = $conn->prepare($query);

        $stmt->bind_param("sssiiddssss", $singola, $doppia, $suite, $postiLetto, $postiLettoPlusOne, $minPrice, $maxPrice, $checkOutDate, $checkInDate, $checkInDate, $checkOutDate);

        $postiLettoPlusOne = $postiLetto + 1;
        $singola = $dData['singola'] ? 'singola' : '';
        $doppia = $dData['doppia'] ? 'doppia' : '';
        $suite = $dData['suite'] ? 'suite' : '';

        $minPrice = 0;
        $maxPrice = 300;

        if ($dData['prezzo'] == 'zeroCento') {
            $minPrice = 0;
            $maxPrice = 100;
        } elseif ($dData['prezzo'] == 'centoDuecento') {
            $minPrice = 100;
            $maxPrice = 200;
        } elseif ($dData['prezzo'] == 'duecentoTrecento') {
            $minPrice = 200;
            $maxPrice = 300;
        }

        $stmt->execute();

        $result = $stmt->get_result();

        $response = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $queryImage = "SELECT nomeImmagineCamera FROM immagineCamera WHERE numeroCamera = {$row['numeroCamera']} ORDER BY RAND() LIMIT 1";
                $resultImage = $conn->query($queryImage);
                $rowImage = $resultImage->fetch_assoc();

                $response[] = array(
                    'cameraTrovata' => true,
                    'numeroCamera' => $row['numeroCamera'],
                    'tipoCamera' => $row['tipoCamera'],
                    'postiLetto' => $row['postiLetto'],
                    'prezzo' => $row['prezzo'],
                    'disponibilita' => $row['disponibilita'],
                    'nomeCamera' => $row['nomeCamera'],
                    'descrizione' => $row['descrizione'],
                    'nomeImmagineCamera' => $rowImage['nomeImmagineCamera']
                );
            }

            echo json_encode($response);
        } else {
            echo json_encode(array('cameraTrovata' => false, 'message' => 'Nessuna camera trovata'));
        }

        $stmt->close();
        $conn->close();
    }
}
