-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Ago 05, 2024 alle 00:34
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `halid_and_co`
--
CREATE DATABASE IF NOT EXISTS `halid_and_co` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `halid_and_co`;

-- --------------------------------------------------------

--
-- Struttura della tabella `associare`
--

CREATE TABLE `associare` (
  `numeroCamera` int(11) NOT NULL,
  `prenotazione_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `associare`
--

INSERT INTO `associare` (`numeroCamera`, `prenotazione_id`) VALUES
(1, 1),
(1, 41),
(1, 50),
(2, 52),
(4, 7),
(5, 15),
(5, 36),
(6, 12),
(6, 27),
(6, 37),
(9, 45),
(11, 21),
(12, 25),
(12, 29),
(12, 53),
(15, 39),
(16, 31),
(19, 38),
(20, 26),
(20, 43),
(21, 6),
(22, 8),
(22, 19),
(22, 32),
(23, 49),
(26, 30),
(27, 20),
(27, 23),
(27, 46),
(28, 22),
(31, 17),
(31, 35),
(32, 33),
(34, 11),
(35, 28),
(36, 44),
(37, 34),
(40, 14),
(40, 42),
(41, 13),
(43, 51),
(44, 24),
(45, 18),
(46, 47),
(47, 16),
(47, 40);

-- --------------------------------------------------------

--
-- Struttura della tabella `camera`
--

CREATE TABLE `camera` (
  `numeroCamera` int(11) NOT NULL,
  `tipoCamera` varchar(20) NOT NULL,
  `postiLetto` int(11) NOT NULL,
  `prezzo` decimal(5,2) NOT NULL,
  `disponibilita` enum('libera','occupata') NOT NULL,
  `nomeCamera` varchar(50) DEFAULT NULL,
  `descrizione` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `camera`
--

INSERT INTO `camera` (`numeroCamera`, `tipoCamera`, `postiLetto`, `prezzo`, `disponibilita`, `nomeCamera`, `descrizione`) VALUES
(1, 'Doppia', 2, 180.00, 'libera', 'Suite Paradiso', 'Una lussuosa suite con vista panoramica, arredata con gusto e dotata di ogni comfort per un soggiorno indimenticabile. Ideale per chi cerca il massimo del relax e dell\'eleganza durante la propria vacanza.'),
(2, 'Singola', 1, 50.00, 'occupata', 'Camera Serenità', 'Un rifugio accogliente e tranquillo, perfetto per un soggiorno rilassante. Arredata con tonalità calde e accoglienti, questa camera offre tutto ciò di cui hai bisogno per riposare e rigenerarti.'),
(3, 'Suite', 3, 190.00, 'libera', 'Loft Esclusivo', 'Un\'oasi di lusso e stile, questo loft esclusivo offre spazi ampi e una vista mozzafiato sulla città. Perfetto per chi ama il comfort e l\'eleganza, è ideale per un soggiorno indimenticabile.'),
(4, 'Doppia', 2, 120.00, 'libera', 'Deluxe Relax', 'Questa camera offre un ambiente raffinato e confortevole, con dettagli di design e servizi esclusivi per garantire il massimo del comfort durante il tuo soggiorno. Perfetta per una vacanza di relax e benessere.'),
(5, 'Singola', 1, 60.00, 'libera', 'Vista Mare', 'Con una splendida vista sul mare, questa camera offre un ambiente luminoso e accogliente, arredato con gusto e dotato di ogni comfort moderno. Ideale per chi cerca una vacanza al mare in un ambiente elegante e rilassante.'),
(6, 'Suite', 4, 200.00, 'libera', 'Alba Suite', 'Una suite spaziosa e lussuosa, perfetta per un soggiorno romantico o una vacanza di lusso. Con interni eleganti e una vista mozzafiato sull\'alba, questa camera offre il massimo del comfort e dell\'eleganza.'),
(7, 'Doppia', 2, 100.00, 'libera', 'Giardino Segreto', 'Immersa nel verde di un incantevole giardino, questa camera offre un\'oasi di tranquillità e relax. Con un patio privato e una vista sul verde circostante, è l\'ideale per chi cerca una fuga dalla vita quotidiana.'),
(8, 'Singola', 1, 55.00, 'libera', 'Camera Luminosa', 'Confortevole e accogliente, questa camera è perfetta per un soggiorno rilassante. Con dettagli luminosi e una vista sulla città, offre un ambiente caldo e invitante per il tuo soggiorno.'),
(9, 'Suite', 5, 200.00, 'libera', 'Suite Panorama', 'Con una vista panoramica mozzafiato, questa suite offre uno spazio elegante e raffinato per un soggiorno indimenticabile. Dotata di ogni comfort e dettagli di design, è l\'ideale per chi cerca il massimo del lusso.'),
(10, 'Suite', 3, 150.00, 'libera', 'Loft Chic', 'Uno spazio moderno e alla moda, questo loft offre un ambiente elegante e confortevole per un soggiorno di lusso. Con dettagli di design e servizi esclusivi, è perfetto per chi ama lo stile e il comfort durante la propria vacanza.'),
(11, 'Singola', 1, 55.00, 'libera', 'Camera Zen', 'Un\'oasi di tranquillità e benessere, questa camera offre un ambiente accogliente e confortevole per un soggiorno rilassante. Con dettagli di design e servizi esclusivi, è l\'ideale per chi cerca una pausa dalla routine quotidiana.'),
(12, 'Doppia', 2, 90.00, 'occupata', 'Suite Eleganza', 'Con interni raffinati e dettagli di design, questa suite offre uno spazio elegante e confortevole per un soggiorno di lusso. Perfetta per una vacanza romantica o un viaggio d\'affari, offre il massimo del comfort e dell\'eleganza.'),
(13, 'Singola', 1, 55.00, 'libera', 'Camera Raffinata', 'Con una splendida vista sul giardino, questa camera offre un ambiente luminoso e accogliente per un soggiorno rilassante. Perfetta per chi ama la natura e cerca un rifugio tranquillo dalla vita cittadina.'),
(14, 'Suite', 4, 180.00, 'libera', 'Suite Dream', 'Spaziosa e confortevole, questa camera è perfetta per un soggiorno d\'affari o una vacanza di lusso. Con dettagli di design e servizi esclusivi, offre tutto ciò di cui hai bisogno per un soggiorno indimenticabile.'),
(15, 'Suite', 3, 160.00, 'libera', 'Loft Cosy', 'Con interni moderni e dettagli di design, questo loft offre uno spazio elegante e confortevole per un soggiorno di lusso. Con vista sulla città e servizi esclusivi, è l\'ideale per chi cerca il massimo del comfort e dello stile durante la propria vacanza.'),
(16, 'Singola', 1, 60.00, 'libera', 'Camera Zenith', 'Con un\'atmosfera intima e romantica, questa suite offre uno spazio accogliente e confortevole per una fuga romantica. Con dettagli raffinati e servizi esclusivi, è l\'ideale per una vacanza indimenticabile con il tuo partner.'),
(17, 'Suite', 5, 200.00, 'libera', 'Suite Sunset', 'Con una splendida vista sulle montagne, questa camera offre un ambiente tranquillo e rilassante per un soggiorno rigenerante. Perfetta per gli amanti della natura e delle attività all\'aria aperta, è l\'ideale per una vacanza di avventura e relax.'),
(18, 'Singola', 1, 50.00, 'libera', 'Camera Tranquilla', 'Confortevole e accogliente, questa camera offre un ambiente familiare e confortevole per un soggiorno rilassante. Con dettagli classici e servizi moderni, è perfetta per chi cerca il massimo del comfort durante la propria vacanza.'),
(19, 'Doppia', 2, 110.00, 'libera', 'Loft Trendy', 'Uno spazio elegante e moderno, questa suite offre un ambiente lussuoso e confortevole per un soggiorno indimenticabile. Con dettagli di design e servizi esclusivi, è l\'ideale per chi cerca il massimo del lusso durante la propria vacanza.'),
(20, 'Singola', 1, 60.00, 'libera', 'Camera Elite', 'Con una vista panoramica sul parco circostante, questa camera offre un ambiente tranquillo e rilassante per un soggiorno rigenerante. Perfetta per gli amanti della natura e delle attività all\'aria aperta, è l\'ideale per una vacanza immersa nella natura.'),
(21, 'Suite', 3, 140.00, 'libera', 'Suite Celeste', 'Questa suite offre un\'esperienza di soggiorno di lusso con spazi ampi, arredi eleganti e servizi esclusivi. Ideale per chi cerca il massimo comfort e lusso durante la propria vacanza o viaggio d\'affari.'),
(22, 'Singola', 1, 65.00, 'libera', 'Camera Oasi', 'Immersa in un giardino rigoglioso, questa camera offre un\'oasi di tranquillità e relax. Confortevole e accogliente, è perfetta per chi ama trascorrere del tempo all\'aria aperta e godersi la natura.'),
(23, 'Suite', 4, 170.00, 'libera', 'Loft Vintage', 'Con una vista mozzafiato sulla città, questa suite offre un\'esperienza di soggiorno unica e indimenticabile. Con spazi ampi e arredi di lusso, è l\'ideale per una vacanza romantica o un viaggio d\'affari di successo.'),
(24, 'Doppia', 2, 70.00, 'libera', 'Suite Luna', 'Questa camera offre un\'esperienza di soggiorno accogliente e confortevole, con tutti i comfort necessari per un soggiorno piacevole e rilassante. Ideale per una vacanza in famiglia o un viaggio d\'affari.'),
(25, 'Singola', 1, 55.00, 'libera', 'Camera Fiore', 'Progettata per offrire un\'esperienza di relax totale, questa suite dispone di un\'area spa privata con sauna, vasca idromassaggio e altri trattamenti benessere. Perfetta per una fuga romantica o una vacanza di rigenerazione.'),
(26, 'Suite', 5, 200.00, 'libera', 'Suite Regale', 'Con un design elegante e moderno, questa camera offre un\'atmosfera sofisticata e confortevole per un soggiorno indimenticabile. Ideale per chi cerca il massimo dello stile e del comfort durante la propria vacanza.'),
(27, 'Singola', 1, 60.00, 'libera', 'Camera Boutique', 'Suite Artistica - Questa suite è un\'opera d\'arte in sé, con arredi e decorazioni uniche che creano un\'atmosfera unica e accogliente. Perfetta per gli amanti dell\'arte e della creatività, è l\'ideale per una vacanza ispiratrice.'),
(28, 'Suite', 3, 130.00, 'libera', 'Loft Design', 'Con un design pulito e essenziale, questa camera offre un ambiente rilassante e confortevole per un soggiorno senza fronzoli. Ideale per chi ama lo stile minimalista e cerca una fuga dalla frenesia della vita quotidiana.'),
(29, 'Singola', 1, 70.00, 'libera', 'Vista Verde', 'Progettata per promuovere il benessere e la serenità, questa suite offre un\'atmosfera calma e rilassante per un soggiorno rigenerante. Con dettagli orientali e servizi esclusivi, è l\'ideale per una vacanza di relax e meditazione.'),
(30, 'Suite', 4, 190.00, 'libera', 'Suite Bella Vita', 'Con uno stile bohemien e accogliente, questa camera offre un ambiente caldo e confortevole per un soggiorno piacevole e rilassante. Perfetta per chi ama lo stile bohemien e cerca un\'esperienza unica durante la propria vacanza.'),
(31, 'Singola', 1, 55.00, 'libera', 'Camera Dolcezza', 'Questa suite offre un\'esperienza di soggiorno esclusiva e lussuosa, con servizi personalizzati e comfort di alto livello. Perfetta per chi cerca un trattamento VIP durante la propria vacanza o viaggio d\'affari.'),
(32, 'Suite', 5, 200.00, 'libera', 'Loft Moderno', 'Con un\'atmosfera intima e accogliente, questa camera è perfetta per una fuga romantica o una vacanza di coppia. Con dettagli romantici e comfort di alto livello, è l\'ideale per creare ricordi indimenticabili.'),
(33, 'Doppia', 2, 85.00, 'libera', 'Suite Incanto', 'Con un design moderno e spazi aperti, questa suite offre un\'esperienza di soggiorno contemporanea e raffinata. Ideale per chi ama lo stile loft e cerca un ambiente confortevole e accogliente durante la propria vacanza.'),
(34, 'Singola', 1, 60.00, 'libera', 'Camera Stella', 'Con arredi retrò e dettagli d\'epoca, questa camera offre un viaggio nel tempo con un tocco di nostalgia. Perfetta per gli amanti dello stile vintage e delle atmosfere d\'altri tempi, è l\'ideale per una vacanza piena di fascino e carattere.'),
(35, 'Suite', 3, 150.00, 'libera', 'Suite Azzurra', 'Progettata per le esigenze delle famiglie, questa suite offre spazi ampi e comfort per garantire un soggiorno piacevole e rilassante per tutti i membri della famiglia. Con servizi dedicati e attenzione ai dettagli, è l\'ideale per una vacanza in famiglia indimenticabile.'),
(36, 'Singola', 1, 70.00, 'libera', 'Camera Chic', 'Con un design contemporaneo e spazi aperti, questa camera offre un\'atmosfera moderna e accogliente per un soggiorno piacevole e rilassante. Ideale per chi ama lo stile loft e cerca un ambiente confortevole durante la propria vacanza.'),
(37, 'Suite', 4, 180.00, 'libera', 'Loft Splendore', 'Pensata per i viaggiatori d\'affari e gli ospiti più esigenti, questa suite offre servizi esclusivi e comfort di alto livello per un soggiorno di lusso e successo. Perfetta per una vacanza di lavoro o un viaggio d\'affari di successo.'),
(38, 'Suite', 5, 200.00, 'libera', 'Suite Magica', 'Con vista panoramica sul mare e arredi eleganti, questa camera offre un\'esperienza di soggiorno unica e indimenticabile. Perfetta per gli amanti del mare e del relax, è l\'ideale per una vacanza rigenerante e rilassante.'),
(39, 'Singola', 1, 55.00, 'libera', 'Camera Blu', 'La massima espressione di lusso e raffinatezza, questa suite offre spazi ampi e arredi di alta qualità per un soggiorno indimenticabile. Con servizi esclusivi e attenzione ai dettagli, è perfetta per gli ospiti più esigenti e per occasioni speciali.'),
(40, 'Suite', 3, 160.00, 'libera', 'Loft Coccole', 'Camera Design - Con un design innovativo e arredi di tendenza, questa camera offre un\'esperienza di soggiorno contemporanea e accattivante. Ideale per chi ama lo stile moderno e cerca un ambiente unico durante la propria vacanza.'),
(41, 'Doppia', 2, 95.00, 'libera', 'Suite Felicità', 'Suite Panoramica - Con viste mozzafiato sulla città o sulla natura circostante, questa suite offre un\'esperienza visiva indimenticabile. Perfetta per chi ama godersi panorami mozzafiato direttamente dalla propria stanza, è l\'ideale per una vacanza immersa nella bellezza.'),
(42, 'Singola', 1, 65.00, 'libera', 'Camera Diamante', 'Camera Zen - Con un\'atmosfera calma e rilassante, questa camera è progettata per offrire un\'oasi di pace e tranquillità. Perfetta per chi cerca un rifugio dallo stress quotidiano, è l\'ideale per una vacanza rigenerante e rilassante.'),
(43, 'Suite', 4, 170.00, 'occupata', 'Suite Avorio', 'Suite Loft Chic - Con un design elegante e minimalista, questa suite offre uno stile contemporaneo e raffinato. Perfetta per chi ama lo stile loft e cerca un ambiente moderno e accogliente durante il proprio soggiorno.'),
(44, 'Singola', 1, 60.00, 'libera', 'Camera Fantasia', 'Camera Familiare Deluxe - Progettata per soddisfare le esigenze delle famiglie più esigenti, questa camera offre spazi ampi e comfort di alto livello. Con servizi dedicati per i bambini e attenzione ai dettagli per gli adulti, è l\'ideale per una vacanza in famiglia indimenticabile.'),
(45, 'Suite', 5, 200.00, 'libera', 'Loft Paradiso', 'Suite Esclusiva Deluxe - La massima espressione di lusso e comfort, questa suite offre servizi esclusivi e arredi di alta qualità per un soggiorno indimenticabile. Con spazi ampi e dettagli curati, è perfetta per gli ospiti più esigenti e per occasioni speciali.'),
(46, 'suite', 4, 300.00, 'libera', 'Suite Bourgeoit', 'La Suite Bourgeoit offre un\'esperienza di soggiorno elegante e raffinata, pensata per coloro che cercano il massimo comfort e lusso durante il loro soggiorno. Situata al piano superiore del B&B, questa suite spaziosa e ben illuminata accoglie gli ospiti in un ambiente di classe e raffinatezza.'),
(47, 'doppia', 2, 150.00, 'libera', 'Camera Exposition', 'La Camera Exposition offre un\'esperienza di soggiorno unica e accogliente, perfetta per coloro che desiderano immergersi in un\'atmosfera artistica e ispiratrice. Situata al cuore dell\'hotel, questa camera incantevole è progettata per soddisfare i gusti degli ospiti più esigenti, offrendo un mix di comfort e stile.'),
(48, 'singola', 1, 235.00, 'libera', 'Camera Sognatore', 'La Camera Sognatore è un rifugio di tranquillità e ispirazione. Arredata con gusto e attenzione ai dettagli, questa camera offre un ambiente sereno e accogliente, ideale per chi desidera rilassarsi e lasciarsi trasportare dalla fantasia. Le tonalità delicate delle pareti, i tessuti morbidi e gli arredi eleganti creano un\'atmosfera sognante.');

-- --------------------------------------------------------

--
-- Struttura della tabella `immaginecamera`
--

CREATE TABLE `immaginecamera` (
  `immagineCamera_id` int(11) NOT NULL,
  `numeroCamera` int(11) DEFAULT NULL,
  `nomeImmagineCamera` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `immaginecamera`
--

INSERT INTO `immaginecamera` (`immagineCamera_id`, `numeroCamera`, `nomeImmagineCamera`) VALUES
(1, 1, 'suiteParadiso1\r'),
(2, 1, 'suiteParadiso2\r'),
(3, 1, 'suiteParadiso3\r'),
(4, 1, 'suiteParadiso4\r'),
(5, 2, 'cameraSerenita1\r'),
(6, 2, 'cameraSerenita2\r'),
(7, 2, 'cameraSerenita3\r'),
(8, 2, 'cameraSerenita4\r'),
(9, 3, 'loftEsclusivo1\r'),
(10, 3, 'loftEsclusivo2\r'),
(11, 3, 'loftEsclusivo3\r'),
(12, 3, 'loftEsclusivo4\r'),
(13, 4, 'deluxeRelax1\r'),
(14, 4, 'deluxeRelax2\r'),
(15, 4, 'deluxeRelax3\r'),
(16, 4, 'deluxeRelax4\r'),
(17, 5, 'vistaMare1\r'),
(18, 5, 'vistaMare2\r'),
(19, 5, 'vistaMare3\r'),
(20, 5, 'vistaMare4\r'),
(21, 6, 'albaSuite1\r'),
(22, 6, 'albaSuite2\r'),
(23, 6, 'albaSuite3\r'),
(24, 6, 'albaSuite4\r'),
(25, 7, 'giardinoSegreto1\r'),
(26, 7, 'giardinoSegreto2\r'),
(27, 7, 'giardinoSegreto3\r'),
(28, 7, 'giardinoSegreto4\r'),
(29, 8, 'cameraLuminosa1\r'),
(30, 8, 'cameraLuminosa2\r'),
(31, 8, 'cameraLuminosa3\r'),
(32, 8, 'cameraLuminosa4\r'),
(33, 9, 'suitePanorama1\r'),
(34, 9, 'suitePanorama2\r'),
(35, 9, 'suitePanorama3\r'),
(36, 9, 'suitePanorama4\r'),
(37, 10, 'loftChic1\r'),
(38, 10, 'loftChic2\r'),
(39, 10, 'loftChic3\r'),
(40, 10, 'loftChic4\r'),
(41, 11, 'cameraZen1\r'),
(42, 11, 'cameraZen2\r'),
(43, 11, 'cameraZen3\r'),
(44, 11, 'cameraZen4\r'),
(45, 12, 'suiteEleganza1\r'),
(46, 12, 'suiteEleganza2\r'),
(47, 12, 'suiteEleganza3\r'),
(48, 12, 'suiteEleganza4\r'),
(49, 13, 'cameraRaffinata1\r'),
(50, 13, 'cameraRaffinata2\r'),
(51, 13, 'cameraRaffinata3\r'),
(52, 13, 'cameraRaffinata4\r'),
(53, 14, 'suiteDream1\r'),
(54, 14, 'suiteDream2\r'),
(55, 14, 'suiteDream3\r'),
(56, 14, 'suiteDream4\r'),
(57, 15, 'loftCosy1\r'),
(58, 15, 'loftCosy2\r'),
(59, 15, 'loftCosy3\r'),
(60, 15, 'loftCosy4\r'),
(61, 16, 'cameraZenith1\r'),
(62, 16, 'cameraZenith2\r'),
(63, 16, 'cameraZenith3\r'),
(64, 16, 'cameraZenith4\r'),
(65, 17, 'suiteSunset1\r'),
(66, 17, 'suiteSunset2\r'),
(67, 17, 'suiteSunset3\r'),
(68, 17, 'suiteSunset4\r'),
(69, 18, 'cameraTranquilla1\r'),
(70, 18, 'cameraTranquilla2\r'),
(71, 18, 'cameraTranquilla3\r'),
(72, 18, 'cameraTranquilla4\r'),
(73, 19, 'loftTrendy1\r'),
(74, 19, 'loftTrendy2\r'),
(75, 19, 'loftTrendy3\r'),
(76, 19, 'loftTrendy4\r'),
(77, 20, 'cameraElite1\r'),
(78, 20, 'cameraElite2\r'),
(79, 20, 'cameraElite3\r'),
(80, 20, 'cameraElite4\r'),
(81, 21, 'suiteCeleste1\r'),
(82, 21, 'suiteCeleste2\r'),
(83, 21, 'suiteCeleste3\r'),
(84, 21, 'suiteCeleste4\r'),
(85, 22, 'CameraOasi1\r'),
(86, 22, 'CameraOasi2\r'),
(87, 22, 'CameraOasi3\r'),
(88, 22, 'CameraOasi4\r'),
(89, 23, 'loftVintage1\r'),
(90, 23, 'loftVintage2\r'),
(91, 23, 'loftVintage3\r'),
(92, 23, 'loftVintage4\r'),
(93, 24, 'suiteLuna1\r'),
(94, 24, 'suiteLuna2\r'),
(95, 24, 'suiteLuna3\r'),
(96, 24, 'suiteLuna4\r'),
(97, 25, 'cameraFiore1\r'),
(98, 25, 'cameraFiore2\r'),
(99, 25, 'cameraFiore3\r'),
(100, 25, 'cameraFiore4\r'),
(101, 26, 'suiteRegale1\r'),
(102, 26, 'suiteRegale2\r'),
(103, 26, 'suiteRegale3\r'),
(104, 26, 'suiteRegale4\r'),
(105, 27, 'cameraBoutique1\r'),
(106, 27, 'cameraBoutique2\r'),
(107, 27, 'cameraBoutique3\r'),
(108, 27, 'cameraBoutique4\r'),
(109, 28, 'loftDesign1\r'),
(110, 28, 'loftDesign2\r'),
(111, 28, 'loftDesign3\r'),
(112, 28, 'loftDesign4\r'),
(113, 29, 'vistaVerde1\r'),
(114, 29, 'vistaVerde2\r'),
(115, 29, 'vistaVerde3\r'),
(116, 29, 'vistaVerde4\r'),
(117, 30, 'suiteBellaVita1\r'),
(118, 30, 'suiteBellaVita2\r'),
(119, 30, 'suiteBellaVita3\r'),
(120, 30, 'suiteBellaVita4\r'),
(121, 31, 'cameraDolcezza1\r'),
(122, 31, 'cameraDolcezza2\r'),
(123, 31, 'cameraDolcezza3\r'),
(124, 31, 'cameraDolcezza4\r'),
(125, 32, 'loftModerno1\r'),
(126, 32, 'loftModerno2\r'),
(127, 32, 'loftModerno3\r'),
(128, 32, 'loftModerno4\r'),
(129, 33, 'suiteIncanto1\n'),
(130, 33, 'suiteIncanto2\n'),
(131, 33, 'suiteIncanto3\n'),
(132, 33, 'suiteIncanto4\n'),
(133, 34, 'cameraStella1\r'),
(134, 34, 'cameraStella2\r'),
(135, 34, 'cameraStella3\r'),
(136, 34, 'cameraStella4\r'),
(137, 35, 'suiteAzzurra1\r'),
(138, 35, 'suiteAzzurra2\r'),
(139, 35, 'suiteAzzurra3\r'),
(140, 35, 'suiteAzzurra4\r'),
(141, 36, 'cameraChic1\r'),
(142, 36, 'cameraChic2\r'),
(143, 36, 'cameraChic3\r'),
(144, 36, 'cameraChic4\r'),
(145, 37, 'loftSplendore1\r'),
(146, 37, 'loftSplendore2\r'),
(147, 37, 'loftSplendore3\r'),
(148, 37, 'loftSplendore4\r'),
(149, 38, 'suiteMagica1\r'),
(150, 38, 'suiteMagica2\r'),
(151, 38, 'suiteMagica3\r'),
(152, 38, 'suiteMagica4\r'),
(153, 39, 'cameraBlu1\r'),
(154, 39, 'cameraBlu2\r'),
(155, 39, 'cameraBlu3\r'),
(156, 39, 'cameraBlu4\r'),
(157, 40, 'loftCoccole1\r'),
(158, 40, 'loftCoccole2\r'),
(159, 40, 'loftCoccole3\r'),
(160, 40, 'loftCoccole4\r'),
(161, 41, 'suiteFelicita1\r'),
(162, 41, 'suiteFelicita2\r'),
(163, 41, 'suiteFelicita3\r'),
(164, 41, 'suiteFelicita4\r'),
(165, 42, 'cameraDiamante1\r'),
(166, 42, 'cameraDiamante2\r'),
(167, 42, 'cameraDiamante3\r'),
(168, 42, 'cameraDiamante4\r'),
(169, 43, 'suiteAvorio1\r'),
(170, 43, 'suiteAvorio2\r'),
(171, 43, 'suiteAvorio3\r'),
(172, 43, 'suiteAvorio4\r'),
(173, 44, 'cameraFantasia1\r'),
(174, 44, 'cameraFantasia2\r'),
(175, 44, 'cameraFantasia3\r'),
(176, 44, 'cameraFantasia4\r'),
(177, 45, 'loftParadiso1\r'),
(178, 45, 'loftParadiso2\r'),
(179, 45, 'loftParadiso3\r'),
(180, 45, 'loftParadiso4\r'),
(205, 46, 'suiteBourgeoit1'),
(206, 46, 'suiteBourgeoit2'),
(207, 46, 'suiteBourgeoit3'),
(208, 46, 'suiteBourgeoit4'),
(209, 47, 'cameraExposition1'),
(210, 47, 'cameraExposition2'),
(211, 47, 'cameraExposition3'),
(212, 47, 'cameraExposition4'),
(213, 48, 'cameraSognatore1'),
(214, 48, 'cameraSognatore2'),
(215, 48, 'cameraSognatore3'),
(216, 48, 'cameraSognatore4');

-- --------------------------------------------------------

--
-- Struttura della tabella `ospite`
--

CREATE TABLE `ospite` (
  `ospite_id` int(11) NOT NULL,
  `nome` varchar(20) NOT NULL,
  `cognome` varchar(20) NOT NULL,
  `dataNascita` date NOT NULL,
  `utente_id` int(11) DEFAULT NULL,
  `prenotazione_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `ospite`
--

INSERT INTO `ospite` (`ospite_id`, `nome`, `cognome`, `dataNascita`, `utente_id`, `prenotazione_id`) VALUES
(1, 'Lorenzo', 'Minelli', '2004-06-05', 1, 1),
(8, 'Leonardo', 'Miron', '2004-05-31', 15, 6),
(9, 'Francesco', 'Totti', '2003-09-15', 15, 7),
(10, 'Nicola', 'papa', '2005-05-07', 13, 8),
(12, 'Tab', 'Akram', '2004-12-22', 10, 12),
(13, 'Lorenzo', 'Gerardini', '2008-09-05', 11, 13),
(14, 'Andrea', 'Capasso', '1987-11-10', 10, 15),
(15, 'Maria', 'Briola', '1995-10-18', 10, 15),
(16, 'Luca', 'Patta', '2004-07-05', 12, 16),
(17, 'Marco', 'Rossi', '2003-11-03', 6, 17),
(18, 'Alessandro', 'Bianchi', '1971-11-04', 13, 18),
(19, 'Chiara', 'Romano', '1970-02-04', 4, 19),
(20, 'Luca', 'Esposito', '1989-03-08', 10, 20),
(21, 'Martina', 'De Luca', '1962-02-17', 14, 21),
(22, 'Giuseppe', 'Ricci', '1969-10-24', 6, 22),
(23, 'Sara', 'Moretti', '1994-09-26', 1, 23),
(24, 'Matteo', 'Ferri', '1966-06-04', 15, 24),
(25, 'Francesca', 'Russo', '1974-11-23', 10, 25),
(26, 'Giovanni', 'Conti', '1989-04-06', 1, 26),
(27, 'Elena', 'Ferrari', '1969-03-19', 11, 27),
(28, 'Andrea', 'Barbieri', '1969-10-01', 2, 28),
(29, 'Valentina', 'De Santis', '1989-04-21', 3, 29),
(30, 'Davide', 'Rizzo', '1976-02-09', 4, 30),
(31, 'Laura', 'Martini', '1997-06-23', 3, 31),
(32, 'Federico', 'Galli', '1992-12-02', 8, 32),
(33, 'Giulia', 'Caruso', '1961-03-13', 13, 33),
(34, 'Antonio', 'Ferretti', '1986-07-03', 6, 34),
(35, 'Alessia', 'Monti', '1981-07-12', 16, 35),
(36, 'Stefano', 'Greco', '1977-03-08', 16, 36),
(37, 'Camilla', 'Costa', '1971-06-27', 12, 37),
(38, 'Simone', 'Mancini', '1987-03-01', 16, 38),
(39, 'Sofia', 'Marchetti', '1966-11-06', 11, 39),
(40, 'Fabio', 'Martini', '1973-01-19', 3, 40),
(41, 'Giorgia', 'Rossetti', '1987-01-11', 7, 41),
(42, 'Lorenzo', 'Lombardi', '1960-08-25', 12, 42),
(43, 'Chiara', 'Mariani', '1977-08-23', 11, 43),
(44, 'Emanuele', 'Gallucci', '1962-08-20', 2, 44),
(45, 'Francesca', 'Santoro', '1979-08-21', 2, 45),
(46, 'Valentina', 'Fiorelli', '1985-04-30', 10, 46),
(47, 'Donato', 'Tobia', '2002-01-10', 18, 50),
(48, 'Luca', 'Fernando', '2004-01-16', 1, 51),
(49, 'Mattia', 'Briola', '2006-01-03', 15, 53);

-- --------------------------------------------------------

--
-- Struttura della tabella `pasto`
--

CREATE TABLE `pasto` (
  `pasto_id` int(11) NOT NULL,
  `tipoPasto` varchar(20) NOT NULL,
  `dataPasto` date NOT NULL,
  `note` longtext NOT NULL,
  `prenotazione_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `pasto`
--

INSERT INTO `pasto` (`pasto_id`, `tipoPasto`, `dataPasto`, `note`, `prenotazione_id`) VALUES
(1, 'colazione', '2024-05-11', '', 1),
(2, 'pranzo', '2024-05-12', '', 1),
(10, 'colazione', '2024-06-07', '', 6),
(11, 'colazione', '2024-05-12', '', 7),
(12, 'colazione', '2024-05-13', '', 7),
(13, 'cena', '2024-05-14', '', 7),
(14, 'pranzo', '2024-05-12', '', 7),
(15, 'colazione', '2024-05-12', '', 8),
(16, 'colazione', '2024-05-15', '', 8),
(19, 'colazione', '2024-05-13', '', 13),
(20, 'pranzo', '2024-05-14', '', 13),
(21, 'cena', '2024-05-15', '', 13),
(22, 'colazione', '2024-05-16', '', 13),
(23, 'colazione', '2024-05-15', '', 15),
(24, 'colazione', '2024-05-16', '', 15),
(25, 'colazione', '2024-05-17', '', 15),
(26, 'colazione', '2024-07-16', '', 16),
(27, 'colazione', '2024-07-17', '', 16),
(28, 'pranzo', '2024-07-17', '', 16),
(29, 'Pranzo', '2024-01-04', 'Note per il pasto', 17),
(30, 'Pranzo', '2024-01-19', 'Note per il pasto', 18),
(31, 'Cena', '2024-01-06', 'Note per il pasto', 19),
(32, 'Pranzo', '2024-02-23', 'Note per il pasto', 20),
(33, 'Colazione', '2024-02-16', 'Note per il pasto', 21),
(34, 'Colazione', '2024-02-24', 'Note per il pasto', 22),
(35, 'Cena', '2024-03-19', 'Note per il pasto', 23),
(36, 'Colazione', '2024-03-05', 'Note per il pasto', 24),
(37, 'Pranzo', '2024-03-17', 'Note per il pasto', 25),
(38, 'Colazione', '2024-04-10', 'Note per il pasto', 26),
(39, 'Colazione', '2024-04-13', 'Note per il pasto', 27),
(40, 'Cena', '2024-04-16', 'Note per il pasto', 28),
(41, 'Pranzo', '2024-05-08', 'Note per il pasto', 29),
(42, 'Colazione', '2024-05-28', 'Note per il pasto', 30),
(43, 'Colazione', '2024-05-25', 'Note per il pasto', 31),
(44, 'Colazione', '2024-01-22', 'Note per il pasto', 32),
(45, 'Pranzo', '2024-01-10', 'Note per il pasto', 33),
(46, 'Pranzo', '2024-01-26', 'Note per il pasto', 34),
(47, 'Cena', '2024-02-24', 'Note per il pasto', 35),
(48, 'Pranzo', '2024-02-22', 'Note per il pasto', 36),
(49, 'Cena', '2024-02-24', 'Note per il pasto', 37),
(50, 'Colazione', '2024-03-04', 'Note per il pasto', 38),
(51, 'Colazione', '2024-03-12', 'Note per il pasto', 39),
(52, 'Cena', '2024-03-06', 'Note per il pasto', 40),
(53, 'Colazione', '2024-04-14', 'Note per il pasto', 41),
(54, 'Cena', '2024-04-15', 'Note per il pasto', 42),
(55, 'Pranzo', '2024-04-21', 'Note per il pasto', 43),
(56, 'Colazione', '2024-05-15', 'Note per il pasto', 44),
(57, 'Pranzo', '2024-05-19', 'Note per il pasto', 45),
(58, 'Colazione', '2024-05-22', 'Note per il pasto', 46),
(59, 'colazione', '2024-05-22', '', 50),
(60, 'colazione', '2024-05-19', '', 50),
(61, 'colazione', '2024-08-04', '', 51),
(62, 'cena', '2024-08-05', '', 51),
(63, 'cena', '2024-08-06', '', 52),
(64, 'pranzo', '2024-08-08', '', 52),
(65, 'pranzo', '2024-08-23', '', 53),
(66, 'colazione', '2024-08-24', '', 53);

-- --------------------------------------------------------

--
-- Struttura della tabella `prenotazione`
--

CREATE TABLE `prenotazione` (
  `prenotazione_id` int(11) NOT NULL,
  `dataInizioSoggiorno` date NOT NULL,
  `dataFineSoggiorno` date NOT NULL,
  `stato` tinyint(1) NOT NULL,
  `utente_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `prenotazione`
--

INSERT INTO `prenotazione` (`prenotazione_id`, `dataInizioSoggiorno`, `dataFineSoggiorno`, `stato`, `utente_id`) VALUES
(1, '2024-05-11', '2024-05-12', 0, 1),
(6, '2024-06-07', '2024-06-07', 0, 15),
(7, '2024-05-12', '2024-05-14', 0, 15),
(8, '2024-05-12', '2024-05-15', 0, 13),
(11, '2024-06-03', '2024-06-07', 0, 4),
(12, '2024-05-30', '2024-05-31', 0, 10),
(13, '2024-05-13', '2024-05-16', 0, 11),
(14, '2024-05-13', '2024-05-14', 0, 8),
(15, '2024-05-15', '2024-05-17', 0, 10),
(16, '2024-07-16', '2024-07-17', 0, 12),
(17, '2024-01-04', '2024-01-07', 1, 6),
(18, '2024-01-19', '2024-01-19', 1, 13),
(19, '2024-01-02', '2024-01-18', 1, 4),
(20, '2024-02-23', '2024-02-26', 1, 10),
(21, '2024-02-01', '2024-02-25', 1, 14),
(22, '2024-02-23', '2024-02-26', 1, 6),
(23, '2024-03-19', '2024-03-22', 1, 1),
(24, '2024-03-03', '2024-03-18', 1, 15),
(25, '2024-03-15', '2024-03-19', 1, 10),
(26, '2024-04-10', '2024-04-10', 1, 1),
(27, '2024-04-02', '2024-04-28', 1, 11),
(28, '2024-04-16', '2024-04-17', 1, 2),
(29, '2024-05-06', '2024-05-13', 1, 3),
(30, '2024-05-28', '2024-05-29', 1, 4),
(31, '2024-05-13', '2024-05-30', 1, 3),
(32, '2024-01-22', '2024-01-22', 1, 8),
(33, '2024-01-07', '2024-01-30', 1, 13),
(34, '2024-01-26', '2024-01-27', 1, 6),
(35, '2024-02-22', '2024-02-25', 1, 16),
(36, '2024-02-13', '2024-02-27', 1, 16),
(37, '2024-02-24', '2024-02-25', 1, 12),
(38, '2024-03-02', '2024-03-05', 1, 16),
(39, '2024-03-04', '2024-03-18', 1, 11),
(40, '2024-03-05', '2024-03-08', 1, 3),
(41, '2024-04-14', '2024-04-15', 1, 7),
(42, '2024-04-01', '2024-04-28', 1, 12),
(43, '2024-04-21', '2024-04-22', 1, 11),
(44, '2024-05-10', '2024-05-20', 1, 2),
(45, '2024-05-16', '2024-05-26', 1, 2),
(46, '2024-05-14', '2024-05-26', 1, 10),
(47, '2024-05-17', '2024-05-18', 0, 10),
(49, '2024-05-25', '2024-05-26', 0, 17),
(50, '2024-05-18', '2024-05-25', 0, 18),
(51, '2024-08-04', '2024-08-05', 0, 1),
(52, '2024-08-04', '2024-08-10', 0, 15),
(53, '2024-08-23', '2024-08-24', 0, 15);

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `utente_id` int(11) NOT NULL,
  `nome` varchar(20) NOT NULL,
  `cognome` varchar(20) NOT NULL,
  `dataNascita` date NOT NULL,
  `password` varchar(20) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `ruolo` enum('cliente','admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`utente_id`, `nome`, `cognome`, `dataNascita`, `password`, `telefono`, `ruolo`) VALUES
(1, 'Halid', 'Cisse', '2004-04-30', 'Admin', '3594712289', 'admin'),
(2, 'Diego', 'Franzoni', '2005-03-18', 'NonSochemettere006!!', '3561498509', 'cliente'),
(3, 'Enrico', 'Hoxha', '2005-10-11', 'OhShitDamn123', '3278932378', 'cliente'),
(4, 'Togni', 'Claudio', '2004-10-04', 'BohOBhoChiLosSa?', '3423561286', 'cliente'),
(5, 'Maria', 'Bontempi', '1997-02-28', 'QuaE\'TesaEhhh!!', '3477381234', 'cliente'),
(6, 'Elisabetta', 'Maltempi', '2005-05-01', 'Maltempi05', '3261239867', 'cliente'),
(7, 'Muhammad', 'Hasnat', '2005-02-09', '12345678', '3456543432', 'cliente'),
(8, 'Haseeb', 'Mohammad', '2005-09-05', 'Mohammad12345', '3208795632', 'cliente'),
(9, 'Bachir', 'Ba', '2005-05-18', 'Bachir2005', '3807452482', 'cliente'),
(10, 'Tommaso', 'Bertozzi', '2005-11-24', 'Jimbe1234!', '3289328024', 'cliente'),
(11, 'Eleonora', 'Franzoni', '2004-01-01', 'NonLoso04!', '3792347498', 'cliente'),
(12, 'Mattia', 'Patta', '1999-05-21', 'Mattia.Patta!', '3642137684', 'cliente'),
(13, 'Matteo', 'Ragnoli', '2002-07-31', 'EsportaImporta', '3987864627', 'cliente'),
(14, 'Francesca', 'Bodei', '2000-02-13', 'Sei.registrato?', '3525937584', 'cliente'),
(15, 'Alessandro', 'Alberti', '2005-10-10', 'Qwertyuiop!', '3982158693', 'cliente'),
(16, 'Maria', 'Benuzzi', '2004-07-24', 'Porcotroio04!!!!', '3251268797', 'cliente'),
(17, 'Fillipo', 'Minelli', '2005-09-18', 'MammaMia!', '3428971638', 'cliente'),
(18, 'Barbara', 'Bottari', '2003-07-25', 'sangiacomo', '3275691234', 'cliente');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `associare`
--
ALTER TABLE `associare`
  ADD PRIMARY KEY (`numeroCamera`,`prenotazione_id`),
  ADD KEY `prenotazione_id` (`prenotazione_id`);

--
-- Indici per le tabelle `camera`
--
ALTER TABLE `camera`
  ADD PRIMARY KEY (`numeroCamera`);

--
-- Indici per le tabelle `immaginecamera`
--
ALTER TABLE `immaginecamera`
  ADD PRIMARY KEY (`immagineCamera_id`),
  ADD KEY `numeroCamera` (`numeroCamera`);

--
-- Indici per le tabelle `ospite`
--
ALTER TABLE `ospite`
  ADD PRIMARY KEY (`ospite_id`),
  ADD KEY `utente_id` (`utente_id`),
  ADD KEY `prenotazione_id` (`prenotazione_id`);

--
-- Indici per le tabelle `pasto`
--
ALTER TABLE `pasto`
  ADD PRIMARY KEY (`pasto_id`),
  ADD KEY `prenotazione_id` (`prenotazione_id`);

--
-- Indici per le tabelle `prenotazione`
--
ALTER TABLE `prenotazione`
  ADD PRIMARY KEY (`prenotazione_id`),
  ADD KEY `utente_id` (`utente_id`);

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`utente_id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `immaginecamera`
--
ALTER TABLE `immaginecamera`
  MODIFY `immagineCamera_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=217;

--
-- AUTO_INCREMENT per la tabella `ospite`
--
ALTER TABLE `ospite`
  MODIFY `ospite_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT per la tabella `pasto`
--
ALTER TABLE `pasto`
  MODIFY `pasto_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT per la tabella `prenotazione`
--
ALTER TABLE `prenotazione`
  MODIFY `prenotazione_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT per la tabella `utente`
--
ALTER TABLE `utente`
  MODIFY `utente_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `associare`
--
ALTER TABLE `associare`
  ADD CONSTRAINT `associare_ibfk_1` FOREIGN KEY (`numeroCamera`) REFERENCES `camera` (`numeroCamera`),
  ADD CONSTRAINT `associare_ibfk_2` FOREIGN KEY (`prenotazione_id`) REFERENCES `prenotazione` (`prenotazione_id`);

--
-- Limiti per la tabella `immaginecamera`
--
ALTER TABLE `immaginecamera`
  ADD CONSTRAINT `immaginecamera_ibfk_1` FOREIGN KEY (`numeroCamera`) REFERENCES `camera` (`numeroCamera`);

--
-- Limiti per la tabella `ospite`
--
ALTER TABLE `ospite`
  ADD CONSTRAINT `ospite_ibfk_1` FOREIGN KEY (`utente_id`) REFERENCES `utente` (`utente_id`),
  ADD CONSTRAINT `ospite_ibfk_2` FOREIGN KEY (`prenotazione_id`) REFERENCES `prenotazione` (`prenotazione_id`);

--
-- Limiti per la tabella `pasto`
--
ALTER TABLE `pasto`
  ADD CONSTRAINT `pasto_ibfk_1` FOREIGN KEY (`prenotazione_id`) REFERENCES `prenotazione` (`prenotazione_id`);

--
-- Limiti per la tabella `prenotazione`
--
ALTER TABLE `prenotazione`
  ADD CONSTRAINT `prenotazione_ibfk_1` FOREIGN KEY (`utente_id`) REFERENCES `utente` (`utente_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
