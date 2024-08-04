<?php
include 'connect.php';

if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

function randomDate($start_date, $end_date)
{
    $min = strtotime($start_date);
    $max = strtotime($end_date);

    $random_time = rand($min, $max);

    return date('Y-m-d', $random_time);
}

function generateReservation($start_date, $end_date)
{
    global $conn;

    $dataInizio = randomDate($start_date, $end_date);
    $dataFine = randomDate($dataInizio, $end_date);

    $utente_id = rand(1, 16);

    $numeroCamera = rand(1, 47);

    $pasti = array('Colazione', 'Pranzo', 'Cena');
    $dataPasto = randomDate($dataInizio, $dataFine);
    $tipoPasto = $pasti[array_rand($pasti)];
    $notePasto = "Note per il pasto";

    $nomeOspite = "Ospite";
    $cognomeOspite = "Cognome";
    $dataNascitaOspite = randomDate('1960-01-01', '2005-12-31');

    $queryPrenotazione = "INSERT INTO prenotazione (dataInizioSoggiorno, dataFineSoggiorno, stato, utente_id) VALUES ('$dataInizio', '$dataFine', 1, $utente_id)";
    $conn->query($queryPrenotazione);

    $prenotazione_id = $conn->insert_id;

    $queryAssociare = "INSERT INTO associare (numeroCamera, prenotazione_id) VALUES ($numeroCamera, $prenotazione_id)";
    $conn->query($queryAssociare);

    $queryPasto = "INSERT INTO pasto (tipoPasto, dataPasto, note, prenotazione_id) VALUES ('$tipoPasto', '$dataPasto', '$notePasto', $prenotazione_id)";
    $conn->query($queryPasto);

    $queryOspite = "INSERT INTO ospite (nome, cognome, dataNascita, utente_id, prenotazione_id) VALUES ('$nomeOspite', '$cognomeOspite', '$dataNascitaOspite', $utente_id, $prenotazione_id)";
    $conn->query($queryOspite);
}

for ($mese = 1; $mese <= 5; $mese++) {
    $anno = 2024;
    $start_date = "$anno-$mese-01";
    $end_date = date("Y-m-t", strtotime($start_date));

    for ($i = 0; $i < 3; $i++) {
        generateReservation($start_date, $end_date);
    }
}

echo "Prenotazioni generate con successo.";

$conn->close();
