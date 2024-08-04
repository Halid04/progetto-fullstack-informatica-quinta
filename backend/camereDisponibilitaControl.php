<?php
include 'connect.php';

$currentDate = date("Y-m-d");

$queryPrenotazioni = "SELECT a.numeroCamera, p.prenotazione_id, p.dataInizioSoggiorno, p.dataFineSoggiorno FROM associare a JOIN prenotazione p ON a.prenotazione_id = p.prenotazione_id";

$resultPrenotazioni = $conn->query($queryPrenotazioni);

if ($resultPrenotazioni->num_rows > 0) {
    while ($rowPrenotazione = $resultPrenotazioni->fetch_assoc()) {
        $numeroCamera = $rowPrenotazione['numeroCamera'];
        $prenotazioneId = $rowPrenotazione['prenotazione_id'];
        $dataInizioSoggiorno = $rowPrenotazione['dataInizioSoggiorno'];
        $dataFineSoggiorno = $rowPrenotazione['dataFineSoggiorno'];

        if ($currentDate >= $dataInizioSoggiorno && $currentDate <= $dataFineSoggiorno) {
            $queryUpdateDisponibilita = "UPDATE camera SET disponibilita = 'occupata' WHERE numeroCamera = ?";
            $stmtUpdateDisponibilita = $conn->prepare($queryUpdateDisponibilita);
            $stmtUpdateDisponibilita->bind_param("i", $numeroCamera);
            $stmtUpdateDisponibilita->execute();
            $stmtUpdateDisponibilita->close();
        } else {
            $queryUpdateDisponibilita = "UPDATE camera SET disponibilita = 'libera' WHERE numeroCamera = ?";
            $stmtUpdateDisponibilita = $conn->prepare($queryUpdateDisponibilita);
            $stmtUpdateDisponibilita->bind_param("i", $numeroCamera);
            $stmtUpdateDisponibilita->execute();
            $stmtUpdateDisponibilita->close();
        }
    }
} else {
    echo "Nessuna prenotazione trovata.";
}

$conn->close();
?>
