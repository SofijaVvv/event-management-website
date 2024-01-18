-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 18, 2024 at 02:59 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projekat`
--

-- --------------------------------------------------------

--
-- Table structure for table `app`
--

CREATE TABLE `app` (
  `id` int(11) NOT NULL,
  `app_naziv` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dogadjaji`
--

CREATE TABLE `dogadjaji` (
  `id` int(11) NOT NULL,
  `datum` date NOT NULL,
  `vrijeme` time NOT NULL,
  `komitenti_id` int(11) NOT NULL,
  `vrsta_dogadjaja_id` int(11) NOT NULL,
  `status_dogadjaja_id` int(11) NOT NULL,
  `lokacija_id` int(11) NOT NULL,
  `ocjena_dogadjaja_id` int(11) DEFAULT NULL,
  `operater_id` int(11) NOT NULL,
  `opis` text DEFAULT NULL,
  `iznos` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dogadjaji`
--

INSERT INTO `dogadjaji` (`id`, `datum`, `vrijeme`, `komitenti_id`, `vrsta_dogadjaja_id`, `status_dogadjaja_id`, `lokacija_id`, `ocjena_dogadjaja_id`, `operater_id`, `opis`, `iznos`) VALUES
(2, '2024-04-02', '12:00:00', 14, 1, 1, 1, 1, 3, 'hello', 120.00),
(3, '2024-04-02', '08:00:00', 14, 1, 1, 1, 1, 3, 'Mare', 120.00);

-- --------------------------------------------------------

--
-- Table structure for table `dogadjaji_raspored`
--

CREATE TABLE `dogadjaji_raspored` (
  `id` int(11) NOT NULL,
  `dogadjaj_id` int(11) NOT NULL,
  `operater_id` int(11) NOT NULL,
  `vrijeme_pocetka` datetime NOT NULL,
  `vrijeme_zavrsetka` datetime DEFAULT NULL,
  `opis` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dogadjaji_raspored`
--

INSERT INTO `dogadjaji_raspored` (`id`, `dogadjaj_id`, `operater_id`, `vrijeme_pocetka`, `vrijeme_zavrsetka`, `opis`) VALUES
(1, 2, 4, '2024-04-22 00:00:00', NULL, 'Hello my name is Sofija'),
(2, 2, 4, '2024-04-22 00:00:00', NULL, 'Hello my name is Atena Vujosevic');

-- --------------------------------------------------------

--
-- Table structure for table `dogadjaji_status_dogadjaja`
--

CREATE TABLE `dogadjaji_status_dogadjaja` (
  `id` int(11) NOT NULL,
  `naziv` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dogadjaji_status_dogadjaja`
--

INSERT INTO `dogadjaji_status_dogadjaja` (`id`, `naziv`) VALUES
(1, 'Zakazan');

-- --------------------------------------------------------

--
-- Table structure for table `dogadjaji_troskovi`
--

CREATE TABLE `dogadjaji_troskovi` (
  `id` int(11) DEFAULT NULL,
  `datum` date DEFAULT NULL,
  `vrijeme` time DEFAULT NULL,
  `komitenti_id` int(11) DEFAULT NULL,
  `vrsta_dogadjaja_id` int(11) DEFAULT NULL,
  `status_dogadjaja_id` int(11) DEFAULT NULL,
  `lokacija_id` int(11) DEFAULT NULL,
  `ocjena_dogadjaja_id` int(11) DEFAULT NULL,
  `operater_id` int(11) DEFAULT NULL,
  `opis` text DEFAULT NULL,
  `iznos` decimal(53,30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dogadjaji_troskovi`
--

INSERT INTO `dogadjaji_troskovi` (`id`, `datum`, `vrijeme`, `komitenti_id`, `vrsta_dogadjaja_id`, `status_dogadjaja_id`, `lokacija_id`, `ocjena_dogadjaja_id`, `operater_id`, `opis`, `iznos`) VALUES
(2, '2024-04-02', '12:00:00', 14, 1, 1, 1, 1, 3, 'hello', 120.000000000000000000000000000000),
(3, '2024-04-02', '08:00:00', 14, 1, 1, 1, 1, 3, 'Mare', 120.000000000000000000000000000000);

-- --------------------------------------------------------

--
-- Table structure for table `dogadjaji_zadaci`
--

CREATE TABLE `dogadjaji_zadaci` (
  `id` int(11) NOT NULL,
  `opis` text DEFAULT NULL,
  `status` int(11) DEFAULT 0,
  `prioritet` int(11) DEFAULT 0,
  `operater_id` int(11) DEFAULT NULL,
  `dogadjaj_id` int(11) NOT NULL,
  `datum_kreiranja` datetime DEFAULT NULL,
  `datum_zavrsetka` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dogadjaji_zadaci`
--

INSERT INTO `dogadjaji_zadaci` (`id`, `opis`, `status`, `prioritet`, `operater_id`, `dogadjaj_id`, `datum_kreiranja`, `datum_zavrsetka`) VALUES
(2, 'Hello my name is Atena', 0, 4, 5, 2, '2024-02-20 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dogadjaj_troskovi`
--

CREATE TABLE `dogadjaj_troskovi` (
  `id` int(11) NOT NULL,
  `dogadjaj_id` int(11) DEFAULT 0,
  `vrste_troskova_id` int(11) NOT NULL,
  `komitent_id` int(11) NOT NULL,
  `iznos` decimal(10,2) NOT NULL,
  `opis` text DEFAULT NULL,
  `operater_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dogadjaj_troskovi`
--

INSERT INTO `dogadjaj_troskovi` (`id`, `dogadjaj_id`, `vrste_troskova_id`, `komitent_id`, `iznos`, `opis`, `operater_id`) VALUES
(7, 2, 1, 14, 12000.00, 'Hello my friend', 2),
(8, 2, 1, 14, 12000.00, 'Hello my friend', 2),
(9, 2, 1, 14, 12200.00, 'Hello my friend', 2);

-- --------------------------------------------------------

--
-- Table structure for table `drzave`
--

CREATE TABLE `drzave` (
  `id` int(11) NOT NULL,
  `sifravalute` int(11) NOT NULL,
  `opisvalute` varchar(3) NOT NULL,
  `drzava_skraceno_2` varchar(2) DEFAULT NULL,
  `drzava_skraceno_3` varchar(3) DEFAULT NULL,
  `drzava` varchar(50) NOT NULL,
  `drzava_eng` varchar(50) DEFAULT NULL,
  `paritet` int(11) DEFAULT NULL,
  `issepa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drzave`
--

INSERT INTO `drzave` (`id`, `sifravalute`, `opisvalute`, `drzava_skraceno_2`, `drzava_skraceno_3`, `drzava`, `drzava_eng`, `paritet`, `issepa`) VALUES
(1, 4, 'AFA', 'AF', 'AFG', 'AFGANISTAN                                        ', 'AFGHANISTAN                                       ', 0, 0),
(2, 8, 'ALL', 'AL', 'ALB', 'ALBANIJA                                          ', 'ALBANIA                                           ', 0, 0),
(3, 12, 'DZD', 'DZ', 'DZA', 'ALŽIR                                             ', 'ALGERIA                                           ', 0, 0),
(4, 850, 'VIR', 'VI', 'VIR', 'AMER. DJEVIČANSKI OTOCI                           ', 'VIRGIN ISLANDS (U.S.)                             ', 0, 0),
(5, 16, 'USD', 'AS', 'ASM', 'AMERIČKA SAMOA                                    ', 'AMERICAN SAMOA                                    ', 0, 0),
(6, 20, 'ADP', 'AD', 'AND', 'ANDORA                                            ', 'ANDORRA                                           ', 0, 0),
(7, 24, 'AON', 'AO', 'AGO', 'ANGOLA                                            ', 'ANGOLA                                            ', 0, 0),
(8, 660, 'XCD', 'AI', 'AIA', 'ANGVILA                                           ', 'ANGUILLA                                          ', 0, 0),
(9, 10, 'ATA', 'AQ', 'ATA', 'ANTARKTIK                                         ', 'ANTARTICA                                         ', 0, 0),
(10, 28, 'ATG', 'AG', 'ATG', 'ANTIGVA I BARBUDA                                 ', 'ANTIGUA AND BARBUDA                               ', 0, 0),
(11, 32, 'ARS', 'AR', 'ARG', 'ARGENTINA                                         ', 'ARGENTINA                                         ', 0, 0),
(12, 533, 'AWG', 'AW', 'ABW', 'ARUBA                                             ', 'ARUBA                                             ', 0, 0),
(13, 36, 'AUD', 'AU', 'AUS', 'AUSTRALIJA                                        ', 'AUSTRALIA                                         ', 1, 0),
(14, 40, 'ATS', 'AT', 'AUT', 'AUSTRIJA                                          ', 'AUSTRIA                                           ', 1, 0),
(15, 31, 'AZM', 'AZ', 'AZE', 'AZERBAJDŽAN                                       ', 'AZERBAIJAN                                        ', 0, 0),
(16, 44, 'BSD', 'BS', 'BHS', 'BAHAMI                                            ', 'BAHAMAS                                           ', 0, 0),
(17, 48, 'BHD', 'BH', 'BHR', 'BAHREIN                                           ', 'BAHRAIN                                           ', 0, 0),
(18, 50, 'BDT', 'BD', 'BGD', 'BANGLADEŠ                                         ', 'BANGLADESH                                        ', 0, 0),
(19, 52, 'BBD', 'BB', 'BRB', 'BARBADOS                                          ', 'BARBADOS                                          ', 0, 0),
(20, 56, 'BEF', 'BE', 'BEL', 'BELGIJA                                           ', 'BELGIUM                                           ', 1, 0),
(21, 84, 'BZD', 'BZ', 'BLZ', 'BELIZE                                            ', 'BELIZE                                            ', 0, 0),
(22, 204, 'BEN', 'BJ', 'BEN', 'BENIN                                             ', 'BENIN                                             ', 0, 0),
(23, 60, 'BMD', 'BM', 'BMU', 'BERMUDI                                           ', 'BERMUDA                                           ', 0, 0),
(24, 952, 'XOF', 'CI', 'CIV', 'BJELOKOSNA OBALA                                  ', 'COTE D´IVOIRE                                     ', 0, 0),
(25, 933, 'BYN', 'BY', 'BLR', 'BJELORUSIJA                                       ', 'BELARUS                                           ', 0, 0),
(26, 72, 'BWP', 'BW', 'BWA', 'BOCVANA                                           ', 'BOTSWANA                                          ', 0, 0),
(27, 68, 'BOB', 'BO', 'BOL', 'BOLIVIJA                                          ', 'BOLIVIA                                           ', 0, 0),
(28, 840, 'USD', 'BQ', 'BES', 'BONAIRE, SVETI EUSTATIUS I SABA                   ', 'BONAIRE,SINT EUSTATIUS AND SABA                   ', 0, 0),
(29, 977, 'BAM', 'BA', 'BIH', 'BOSNA I HERCEGOVINA                               ', 'BOSNIA AND HERZEGOVINA                            ', 1, 0),
(30, 162, 'CXR', 'CX', 'CXR', 'BOŽIĆNI OTOK                                      ', 'CHRISTMAS ISLAND                                  ', 0, 0),
(31, 986, 'BRL', 'BR', 'BRA', 'BRAZIL                                            ', 'BRAZIL                                            ', 0, 0),
(32, 86, 'USD', 'IO', 'IOT', 'BRIT.INDIJSKOOCEAN. TER.                          ', 'BRITISH INDIAN OCEAN TER.                         ', 0, 0),
(33, 92, 'VGB', 'VG', 'VGB', 'BRITANSKA DJEVIČANSKA OSTRVA                      ', 'VIRGIN ISLANDS (BRITISH)                          ', 0, 0),
(34, 96, 'BND', 'BN', 'BRN', 'BRUNEJ                                            ', 'BRUNEI DARUSSALAM                                 ', 0, 0),
(35, 100, 'BGN', 'BG', 'BGR', 'BUGARSKA                                          ', 'BULGARIA                                          ', 1, 1),
(36, 854, 'BFA', 'BF', 'BFA', 'BURKINA FASO                                      ', 'BURKINA FASO                                      ', 0, 0),
(37, 108, 'BIF', 'BI', 'BDI', 'BURUNDI                                           ', 'BURUNDI                                           ', 0, 0),
(38, 64, 'BTN', 'BT', 'BTN', 'BUTAN                                             ', 'BHUTAN                                            ', 0, 0),
(39, 978, 'EUR', 'ME', 'MNE', 'CRNA GORA                                         ', 'MONTENEGRO                                        ', 1, 0),
(40, 532, 'ANG', 'CW', 'CUW', 'CURACAO                                           ', 'CURACAO                                           ', 0, 0),
(41, 950, 'XAF', 'TD', 'TCD', 'ČAD                                               ', 'CHAD                                              ', 0, 0),
(42, 203, 'CZK', 'CZ', 'CZE', 'ČEŠKA                                             ', 'CZECH REPUBLIC                                    ', 1, 1),
(43, 990, 'CLP', 'CL', 'CHL', 'ČILE                                              ', 'CHILE                                             ', 0, 0),
(44, 208, 'DKK', 'DK', 'DNK', 'DANSKA                                            ', 'DENMARK                                           ', 1, 1),
(45, 212, 'DMA', 'DM', 'DMA', 'DOMINIKA                                          ', 'DOMINICA                                          ', 0, 0),
(46, 214, 'DOP', 'DO', 'DOM', 'DOMINIKANSKA REPUBLIKA                            ', 'DOMINICAN REPUBLIC                                ', 0, 0),
(47, 262, 'DJF', 'DJ', 'DJI', 'DŽIBUTI                                           ', 'DJIBOUTI                                          ', 0, 0),
(48, 818, 'EGP', 'EG', 'EGY', 'EGIPAT                                            ', 'EGYPT                                             ', 0, 0),
(49, 218, 'ECS', 'EC', 'ECU', 'EKVADOR                                           ', 'ECUADOR                                           ', 0, 0),
(50, 226, 'GNQ', 'GQ', 'GNQ', 'EKVATORSKA GVINEJA                                ', 'EQUATORIAL GUINEA                                 ', 0, 0),
(51, 978, 'EUR', 'EM', 'EMU', 'EMU                                               ', 'EMU                                               ', 1, 1),
(52, 232, 'ERI', 'ER', 'ERI', 'ERITREJA                                          ', 'ERITREA                                           ', 0, 0),
(53, 233, 'EEK', 'EE', 'EST', 'ESTONIJA                                          ', 'ESTONIA                                           ', 0, 1),
(54, 230, 'ETB', 'ET', 'ETH', 'ETIOPIJA                                          ', 'ETHIOPIA                                          ', 0, 0),
(55, 954, 'XEU', 'XE', 'XEU', 'EUROPSKI FOND ZA MON.SUR.                         ', 'E.M.C.F.                                          ', 0, 0),
(56, 238, 'FKP', 'FK', 'FLK', 'FAKLANDI(MALVINI)                                 ', 'FALKLAND ISLANDS-MALVINAS                         ', 0, 0),
(57, 242, 'FJD', 'FJ', 'FJI', 'FIDŽI                                             ', 'FIJI                                              ', 0, 0),
(58, 608, 'PHP', 'PH', 'PHL', 'FILIPINI                                          ', 'PHILIPPINES                                       ', 1, 0),
(59, 246, 'FIM', 'FI', 'FIN', 'FINSKA                                            ', 'FINLAND                                           ', 1, 1),
(60, 260, 'FRF', 'TF', 'ATF', 'FRANC. JUŽNI TERITORIJI                           ', 'FRENCH SOUTH. TERRITORIES                         ', 0, 0),
(61, 250, 'FRF', 'FR', 'FRA', 'FRANCUSKA                                         ', 'FRANCE                                            ', 1, 1),
(62, 254, 'GUF', 'GF', 'GUF', 'FRANCUSKA GVAJANA                                 ', 'FRENCH GUIANA                                     ', 0, 0),
(63, 953, 'XPF', 'PF', 'PYF', 'FRANCUSKA POLINEZIJA                              ', 'FRENCH POLYNESIA                                  ', 0, 0),
(64, 266, 'GAB', 'GA', 'GAB', 'GABON                                             ', 'GABON                                             ', 0, 0),
(65, 270, 'GMD', 'GM', 'GMB', 'GAMBIJA                                           ', 'GAMBIA                                            ', 0, 0),
(66, 288, 'GHC', 'GH', 'GHA', 'GANA                                              ', 'GHANA                                             ', 0, 0),
(67, 292, 'GIP', 'GI', 'GIB', 'GIBRALTAR                                         ', 'GIBRALTAR                                         ', 0, 0),
(68, 300, 'GRD', 'GR', 'GRC', 'GRČKA                                             ', 'GREECE                                            ', 100, 1),
(69, 308, 'GRD', 'GD', 'GRD', 'GRENADA                                           ', 'GRENADA                                           ', 0, 0),
(70, 304, 'GRL', 'GL', 'GRL', 'GRENLAND                                          ', 'GREENLAND                                         ', 0, 0),
(71, 268, 'GEK', 'GE', 'GEO', 'GRUZIJA                                           ', 'GEORGIA                                           ', 0, 0),
(72, 316, 'GUM', 'GU', 'GUM', 'GUAM                                              ', 'GUAM                                              ', 0, 0),
(73, 826, 'GBP', 'GG', 'GGY', 'GUERNSEY                                          ', 'GUERNSEY                                          ', 0, 0),
(74, 312, 'GLP', 'GP', 'GLP', 'GVADALUPA                                         ', 'GUADELOUPE                                        ', 0, 0),
(75, 328, 'GYD', 'GY', 'GUY', 'GVAJANA                                           ', 'GUYANA                                            ', 0, 0),
(76, 320, 'GTQ', 'GT', 'GTM', 'GVATEMALA                                         ', 'GUATEMALA                                         ', 0, 0),
(77, 324, 'GNF', 'GN', 'GIN', 'GVINEJA                                           ', 'GUINEA                                            ', 0, 0),
(78, 624, 'GWP', 'GW', 'GNB', 'GVINEJA BISAU                                     ', 'GUINEA-BISSAU                                     ', 0, 0),
(79, 332, 'HTG', 'HT', 'HTI', 'HAITI                                             ', 'HAITI                                             ', 0, 0),
(80, 528, 'NLG', 'NL', 'NLD', 'HOLANDIJA                                         ', 'NETHERLANDS                                       ', 1, 1),
(81, 340, 'HNL', 'HN', 'HND', 'HONDURAS                                          ', 'HONDURAS                                          ', 0, 0),
(82, 344, 'HKD', 'HK', 'HKG', 'HONGKONG                                          ', 'HONG KONG                                         ', 1, 0),
(83, 191, 'HRK', 'HR', 'HRV', 'HRVATSKA                                          ', 'CROATIA                                           ', 1, 1),
(84, 9090, 'IK ', 'IK', 'IKA', 'IKASA                                             ', 'IKASA                                             ', 0, 0),
(85, 356, 'INR', 'IN', 'IND', 'INDIJA                                            ', 'INDIA                                             ', 1, 0),
(86, 360, 'IDR', 'ID', 'IDN', 'INDONEZIJA                                        ', 'INDONESIA                                         ', 100, 0),
(87, 368, 'IQD', 'IQ', 'IRQ', 'IRAK                                              ', 'IRAQ                                              ', 0, 0),
(88, 364, 'IRR', 'IR', 'IRN', 'IRAN                                              ', 'IRAN,ISLAMIC REPUBLIC OF                          ', 0, 0),
(89, 372, 'IEP', 'IE', 'IRL', 'IRSKA                                             ', 'IRELAND                                           ', 1, 1),
(90, 352, 'ISK', 'IS', 'ISL', 'ISLAND                                            ', 'ICELAND                                           ', 0, 1),
(91, 380, 'ITL', 'IT', 'ITA', 'ITALIJA                                           ', 'ITALY                                             ', 100, 1),
(92, 376, 'ILS', 'IL', 'ISR', 'IZRAEL                                            ', 'ISRAEL                                            ', 1, 0),
(93, 388, 'JMD', 'JM', 'JAM', 'JAMAJKA                                           ', 'JAMAICA                                           ', 0, 0),
(94, 392, 'JPY', 'JP', 'JPN', 'JAPAN                                             ', 'JAPAN                                             ', 100, 0),
(95, 886, 'YER', 'YE', 'YEM', 'JEMEN                                             ', 'YEMEN, REPUBLIC OF                                ', 0, 0),
(96, 51, 'AMD', 'AM', 'ARM', 'JERMENIJA                                         ', 'ARMENIA                                           ', 0, 0),
(97, 826, 'GBP', 'JE', 'JEY', 'JERSEY                                            ', 'JERSEY                                            ', 0, 0),
(98, 400, 'JOD', 'JO', 'JOR', 'JORDAN                                            ', 'JORDAN                                            ', 0, 0),
(99, 239, 'SGS', 'GS', 'SGS', 'JUŽ.GEO. I OTO.JUŽ.SENDV.                         ', 'SO.GEO.ANDTHESO.SAND.ISL.                         ', 0, 0),
(100, 728, 'SSP', 'SS', 'SSD', 'JUŽNI SUDAN                                       ', 'SOUTH SUDAN                                       ', 0, 0),
(101, 710, 'ZAR', 'ZA', 'ZAF', 'JUŽNOAFRIČKA REPUBLIKA                            ', 'SOUTH AFRICA                                      ', 1, 0),
(102, 136, 'KYD', 'KY', 'CYM', 'KAJMANSKI OTOCI                                   ', 'CAYMAN ISLANDS                                    ', 0, 0),
(103, 116, 'KHR', 'KH', 'KHM', 'KAMBODŽA                                          ', 'CAMBODIA                                          ', 0, 0),
(104, 120, 'CMR', 'CM', 'CMR', 'KAMERUN                                           ', 'CAMEROON                                          ', 0, 0),
(105, 124, 'CAD', 'CA', 'CAN', 'KANADA                                            ', 'CANADA                                            ', 1, 0),
(106, 634, 'QAR', 'QA', 'QAT', 'KATAR                                             ', 'QATAR                                             ', 0, 0),
(107, 398, 'KZT', 'KZ', 'KAZ', 'KAZAHSTAN                                         ', 'KAZAKNSTAN                                        ', 0, 0),
(108, 404, 'KES', 'KE', 'KEN', 'KENIJA                                            ', 'KENYA                                             ', 0, 0),
(109, 156, 'CNY', 'CN', 'CHN', 'KINA                                              ', 'CHINA                                             ', 1, 0),
(110, 196, 'CYP', 'CY', 'CYP', 'KIPAR                                             ', 'CYPRUS                                            ', 0, 1),
(111, 417, 'KGS', 'KG', 'KGZ', 'KIRGISTAN                                         ', 'KYRGYSTAN                                         ', 0, 0),
(112, 296, 'KIR', 'KI', 'KIR', 'KIRIBATI                                          ', 'KIRIBATI                                          ', 0, 0),
(113, 166, 'CCK', 'CC', 'CCK', 'KOKOSOVI OTOCI                                    ', 'COCOS (KEELING) ISLANDS                           ', 0, 0),
(114, 170, 'COP', 'CO', 'COL', 'KOLUMBIJA                                         ', 'COLOMBIA                                          ', 0, 0),
(115, 174, 'KMF', 'KM', 'COM', 'KOMORI                                            ', 'COMOROS                                           ', 0, 0),
(116, 178, 'COG', 'CG', 'COG', 'KONGO                                             ', 'CONGO                                             ', 0, 0),
(117, 410, 'KRW', 'KR', 'KOR', 'KOREJA (JUŽNA)                                    ', 'KOREA, REPUBLIC OF                                ', 100, 0),
(118, 408, 'KPW', 'KP', 'PRK', 'KOREJA (SJEVERNA)                                 ', 'KOREA,DEM.PEOPLE\'S REP.OF                         ', 0, 0),
(119, 978, 'EUR', 'KS', 'RKS', 'KOSOVO                                            ', 'KOSOVO                                            ', 1, 0),
(120, 188, 'CRC', 'CR', 'CRI', 'KOSTARIKA                                         ', 'COSTA RICA                                        ', 0, 0),
(121, 192, 'CUP', 'CU', 'CUB', 'KUBA                                              ', 'CUBA                                              ', 0, 0),
(122, 184, 'COK', 'CK', 'COK', 'KUKOVI OTOCI                                      ', 'COOK ISLANDS                                      ', 0, 0),
(123, 414, 'KWD', 'KW', 'KWT', 'KUVAJT                                            ', 'KUWAIT                                            ', 1, 0),
(124, 418, 'LAK', 'LA', 'LAO', 'LAOS                                              ', 'LAO PEOPLE\'S DEM. REP.                            ', 0, 0),
(125, 426, 'LSL', 'LS', 'LSO', 'LESOTO                                            ', 'LESOTHO                                           ', 0, 0),
(126, 428, 'LVL', 'LV', 'LVA', 'LETONIJA                                          ', 'LATVIAN                                           ', 0, 1),
(127, 422, 'LBP', 'LB', 'LBN', 'LIBAN                                             ', 'LEBANON                                           ', 0, 0),
(128, 430, 'LRD', 'LR', 'LBR', 'LIBERIJA                                          ', 'LIBERIA                                           ', 0, 0),
(129, 434, 'LYD', 'LY', 'LBY', 'LIBIJA                                            ', 'LIBYAN ARAB JAMAHIRIYA                            ', 0, 0),
(130, 438, 'LIE', 'LI', 'LIE', 'LIHTENŠTAJN                                       ', 'LIECHTENSTEIN                                     ', 0, 1),
(131, 440, 'LTL', 'LT', 'LTU', 'LITVANIJA                                         ', 'LITHUANIA                                         ', 0, 1),
(132, 442, 'LUF', 'LU', 'LUX', 'LUKSEMBURG                                        ', 'LUXEMBOURG                                        ', 1, 1),
(133, 450, 'MGF', 'MG', 'MDG', 'MADAGASKAR                                        ', 'MADAGASCAR                                        ', 0, 0),
(134, 446, 'MOP', 'MO', 'MAC', 'MAKAO                                             ', 'MACAU                                             ', 0, 0),
(135, 807, 'MKD', 'MK', 'MKD', 'MAKEDONIJA                                        ', 'MACEDONIA                                         ', 0, 0),
(136, 454, 'MWK', 'MW', 'MWI', 'MALAVI                                            ', 'MALAWI                                            ', 0, 0),
(137, 462, 'MVR', 'MV', 'MDV', 'MALDIVI                                           ', 'MALDIVES                                          ', 0, 0),
(138, 458, 'MYR', 'MY', 'MYS', 'MALEZIJA                                          ', 'MALAYSIA                                          ', 1, 0),
(139, 466, 'MLI', 'ML', 'MLI', 'MALI                                              ', 'MALI                                              ', 0, 0),
(140, 504, 'MAD', 'MA', 'MAR', 'MAROKO                                            ', 'MOROCCO                                           ', 0, 0),
(141, 584, 'MHL', 'MH', 'MHL', 'MARŠALSKA OSTRVA                                  ', 'MARSHALL ISLANDS                                  ', 0, 0),
(142, 474, 'MTQ', 'MQ', 'MTQ', 'MARTINIK                                          ', 'MARTINIQUE                                        ', 0, 0),
(143, 480, 'MUR', 'MU', 'MUS', 'MAURICIJUS                                        ', 'MAURITIUS                                         ', 0, 0),
(144, 478, 'MRO', 'MR', 'MRT', 'MAURITANIJA                                       ', 'MAURITANIA                                        ', 0, 0),
(145, 175, 'MYT', 'YT', 'MYT', 'MAYOTTE                                           ', 'MAYOTTE                                           ', 0, 0),
(146, 348, 'HUF', 'HU', 'HUN', 'MAĐARSKA                                          ', 'HUNGARY                                           ', 100, 1),
(147, 484, 'MXN', 'MX', 'MEX', 'MEKSIKO                                           ', 'MEXICO                                            ', 1, 0),
(148, 104, 'MMK', 'MM', 'MMR', 'MIANMAR                                           ', 'MYANMAR                                           ', 0, 0),
(149, 583, 'FSM', 'FM', 'FSM', 'MIKRONEZIJA                                       ', 'MICRONESIA, FED.STATES OF                         ', 0, 0),
(150, 498, 'MDL', 'MD', 'MDA', 'MOLDAVIJA                                         ', 'MOLDOVA                                           ', 0, 0),
(151, 492, 'MCO', 'MC', 'MCO', 'MONAKO                                            ', 'MONACO                                            ', 0, 0),
(152, 496, 'MNT', 'MN', 'MNG', 'MONGOLIJA                                         ', 'MONGOLIA                                          ', 0, 0),
(153, 500, 'MSR', 'MS', 'MSR', 'MONTSERRAT                                        ', 'MONTSERRAT                                        ', 0, 0),
(154, 508, 'MZM', 'MZ', 'MOZ', 'MOZAMBIK                                          ', 'MOZAMBIQUE                                        ', 0, 0),
(155, 516, 'NAD', 'NA', 'NAM', 'NAMIBIJA                                          ', 'NAMIBIA                                           ', 0, 0),
(156, 520, 'NRU', 'NR', 'NRU', 'NAURU                                             ', 'NAURU                                             ', 0, 0),
(157, 524, 'NPR', 'NP', 'NPL', 'NEPAL                                             ', 'NEPAL                                             ', 0, 0),
(158, 562, 'NER', 'NE', 'NER', 'NIGER                                             ', 'NIGER                                             ', 0, 0),
(159, 566, 'NGN', 'NG', 'NGA', 'NIGERIJA                                          ', 'NIGERIA                                           ', 0, 0),
(160, 558, 'NIO', 'NI', 'NIC', 'NIKARAGVA                                         ', 'NICARAGUA                                         ', 0, 0),
(161, 570, 'NIU', 'NU', 'NIU', 'NIUE                                              ', 'NIUE                                              ', 0, 0),
(162, 280, 'DEM', 'DE', 'DEU', 'NJEMAČKA                                          ', 'GERMANY                                           ', 1, 1),
(163, 578, 'NOK', 'NO', 'NOR', 'NORVEŠKA                                          ', 'NORWAY                                            ', 1, 1),
(164, 540, 'NCL', 'NC', 'NCL', 'NOVA KALEDONIJA                                   ', 'NEW CALEDONIA                                     ', 0, 0),
(165, 554, 'NZD', 'NZ', 'NZL', 'NOVI ZELAND                                       ', 'NEW ZELAND                                        ', 1, 0),
(166, 512, 'OMR', 'OM', 'OMN', 'OMAN                                              ', 'OMAN                                              ', 0, 0),
(167, 826, 'GBP', 'IM', 'IMN', 'OSTRVO MEN                                        ', 'ISLE OF MAN                                       ', 0, 0),
(168, 978, 'EUR', 'AX', 'ALA', 'OTOCI ALAND                                       ', 'ALAND ISLANDS                                     ', 0, 0),
(169, 744, 'SJM', 'SJ', 'SJM', 'OTOCI SVALBARD I JAN MAY.                         ', 'SVAL. AND JAN MAYEN ISLA.                         ', 0, 0),
(170, 796, 'TCA', 'TC', 'TCA', 'OTOCI TURKS I CAICOS                              ', 'TURKS AND CAICOS ISLANDS                          ', 0, 0),
(171, 876, 'WLF', 'WF', 'WLF', 'OTOCI WALLIS I FUTUNA                             ', 'WALLIS AND FUTUNA ISLAN.                          ', 0, 0),
(172, 74, 'BVT', 'BV', 'BVT', 'OTOK BUVE                                         ', 'BOUVET ISLAND                                     ', 0, 0),
(173, 36, 'AUD', 'HM', 'HMD', 'OTOK HEARD I OTOCI MCDONALD                       ', 'HEARD ISLAND AND MCDONALD ISLANDS                 ', 0, 0),
(174, 574, 'NFK', 'NF', 'NFK', 'OTOK NORFOLK                                      ', 'NORFOLK ISLAND                                    ', 0, 0),
(175, 234, 'FRO', 'FO', 'FRO', 'OVČJI OTOCI                                       ', 'FAROE ISLANDS                                     ', 0, 0),
(176, 586, 'PKR', 'PK', 'PAK', 'PAKISTAN                                          ', 'PAKISTAN                                          ', 0, 0),
(177, 585, 'PLW', 'PW', 'PLW', 'PALAU                                             ', 'PALAU                                             ', 0, 0),
(178, 376, 'ILS', 'PS', 'PSE', 'PALESTINA, DRŽAVA                                 ', 'PALESTINA, STATE OF                               ', 0, 0),
(179, 590, 'PAB', 'PA', 'PAN', 'PANAMA                                            ', 'PANAMA                                            ', 0, 0),
(180, 598, 'PGK', 'PG', 'PNG', 'PAPUA NOVA GVINEJA                                ', 'PAPUA NEW GUINEA                                  ', 0, 0),
(181, 600, 'PYG', 'PY', 'PRY', 'PARAGVAJ                                          ', 'PARAGUAY                                          ', 0, 0),
(182, 604, 'PEN', 'PE', 'PER', 'PERU                                              ', 'PERU                                              ', 0, 0),
(183, 612, 'PCN', 'PN', 'PCN', 'PITKERN                                           ', 'PITCAIRN                                          ', 0, 0),
(184, 985, 'PLN', 'PL', 'POL', 'POLJSKA                                           ', 'POLAND                                            ', 1, 1),
(185, 630, 'PRI', 'PR', 'PRI', 'PORTORIKO                                         ', 'PUERTO RICO                                       ', 0, 0),
(186, 620, 'PTE', 'PT', 'PRT', 'PORTUGAL                                          ', 'PORTUGAL                                          ', 100, 1),
(187, 470, 'MTL', 'MT', 'MLT', 'REPUBLIKA MALTA                                   ', 'REPUBLIC OF MALTA                                 ', 0, 1),
(188, 941, 'RSD', 'RS', 'SRB', 'REPUBLIKA SRBIJA                                  ', 'REPUBLIC OF SERBIA                                ', 1, 0),
(189, 638, 'REU', 'RE', 'REU', 'REUNION                                           ', 'REUNION                                           ', 0, 0),
(190, 646, 'RWF', 'RW', 'RWA', 'RUANDA                                            ', 'RWANDA                                            ', 0, 0),
(191, 642, 'RON', 'RO', 'ROU', 'RUMUNIJA                                          ', 'ROMANIA                                           ', 1, 1),
(192, 643, 'RUB', 'RU', 'RUS', 'RUSIJA                                            ', 'RUSSIAN FEDERATION                                ', 1, 0),
(193, 840, 'USD', 'US', 'USA', 'SAD                                               ', 'UNITED STATES                                     ', 1, 0),
(194, 222, 'SVC', 'SV', 'SLV', 'SALVADOR                                          ', 'EL SALVADOR                                       ', 0, 0),
(195, 882, 'WST', 'WS', 'WSM', 'SAMOA                                             ', 'SAMOA                                             ', 0, 0),
(196, 674, 'SMR', 'SM', 'SMR', 'SAN MARINO                                        ', 'SAN MARINO                                        ', 0, 0),
(197, 682, 'SAR', 'SA', 'SAU', 'SAUDIJSKA ARABIJA                                 ', 'SAUDI ARABIA                                      ', 0, 0),
(198, 690, 'SCR', 'SC', 'SYC', 'SEJŠELI                                           ', 'SEYCHELLES                                        ', 0, 0),
(199, 686, 'SEN', 'SN', 'SEN', 'SENEGAL                                           ', 'SENEGAL                                           ', 0, 0),
(200, 694, 'SLL', 'SL', 'SLE', 'SIJERA LEONE                                      ', 'SIERRA LEONE                                      ', 0, 0),
(201, 702, 'SGD', 'SG', 'SGP', 'SINGAPUR                                          ', 'SINGAPORE                                         ', 1, 0),
(202, 760, 'SYP', 'SY', 'SYR', 'SIRIJA                                            ', 'SYRIAN ARAB REPUBLIC                              ', 0, 0),
(203, 580, 'MNP', 'MP', 'MNP', 'SJEVERNI MARIJANSKI OTOCI                         ', 'NORTHERN MARIANA ISLANDS                          ', 0, 0),
(204, 703, 'SKK', 'SK', 'SVK', 'SLOVAČKA                                          ', 'SLOVAKIA                                          ', 1, 1),
(205, 705, 'SIT', 'SI', 'SVN', 'SLOVENIJA                                         ', 'SLOVENIA                                          ', 100, 1),
(206, 90, 'SBD', 'SB', 'SLB', 'SOLOMONSKI OTOCI                                  ', 'SOLOMON ISLANDS                                   ', 0, 0),
(207, 706, 'SOS', 'SO', 'SOM', 'SOMALIJA                                          ', 'SOMALIA                                           ', 0, 0),
(208, 140, 'CAF', 'CF', 'CAF', 'SREDNJOAFRIČKA REPUBLIKA                          ', 'CENTRAL AFRICAN REPUBLIC                          ', 0, 0),
(209, 729, 'SDP', 'SD', 'SDN', 'SUDAN                                             ', 'SUDAN                                             ', 0, 0),
(210, 740, 'SRG', 'SR', 'SUR', 'SURINAM                                           ', 'SURINAME                                          ', 0, 0),
(211, 748, 'SZL', 'SZ', 'SWZ', 'SVAZI                                             ', 'SWAZILAND                                         ', 0, 0),
(212, 654, 'SHP', 'SH', 'SHN', 'SVETA HELENA                                      ', 'ST. HELENA                                        ', 0, 0),
(213, 662, 'LCA', 'LC', 'LCA', 'SVETA LUCIJA                                      ', 'SAINT LUCIA                                       ', 0, 0),
(214, 978, 'EUR', 'BL', 'BLM', 'SVETI BARTOLOMEJ                                  ', 'SAINT BARTHELEMY                                  ', 0, 0),
(215, 659, 'KNA', 'KN', 'KNA', 'SVETI KRISTOFOR I NEVIS                           ', 'SAINT KITTS AND NEVIS                             ', 0, 0),
(216, 978, 'EUR', 'MF', 'MAF', 'SVETI MARTIN - francuski dio                      ', 'SAINT MARTIN                                      ', 0, 0),
(217, 532, 'ANG', 'SX', 'SXM', 'SVETI MARTIN - nizozemski dio                     ', 'SINT MARTIN                                       ', 0, 0),
(218, 666, 'SPM', 'PM', 'SPM', 'SVETI PETAR I MIKELON                             ', 'ST.PIERRE AND MIQUELON                            ', 0, 0),
(219, 678, 'STD', 'ST', 'STP', 'SVETI TOMA I PRINCIP                              ', 'SAO TOME AND PRINCIPE                             ', 0, 0),
(220, 951, 'XCD', 'VC', 'VCT', 'SVETI VINCET I GRENADINI                          ', 'SAINT VINCENT AND THE GR.                         ', 0, 0),
(221, 724, 'ESP', 'ES', 'ESP', 'ŠPANIJA                                           ', 'SPAIN                                             ', 100, 1),
(222, 144, 'LKR', 'LK', 'LKA', 'ŠRI LANKA                                         ', 'SRI LANKA                                         ', 0, 0),
(223, 756, 'CHF', 'CH', 'CHE', 'ŠVAJCARSKA                                        ', 'SWITZERLAND                                       ', 1, 0),
(224, 752, 'SEK', 'SE', 'SWE', 'ŠVEDSKA                                           ', 'SWEDEN                                            ', 1, 1),
(225, 762, 'TJK', 'TJ', 'TJK', 'TADŽIKISTAN                                       ', 'TAJIKISTAN                                        ', 0, 0),
(226, 764, 'THB', 'TH', 'THA', 'TAJLAND                                           ', 'THAILAND                                          ', 1, 0),
(227, 901, 'TWD', 'TW', 'TWN', 'TAJVAN                                            ', 'TAIWAN                                            ', 0, 0),
(228, 834, 'TZS', 'TZ', 'TZA', 'TANZANIJA                                         ', 'TANZANIA,UNITED REP. OF                           ', 0, 0),
(229, 626, 'USD', 'Tl', 'TLS', 'TIMOR-LESTE                                       ', 'TIMOR-LESTE                                       ', 0, 0),
(230, 768, 'TGO', 'TG', 'TGO', 'TOGO                                              ', 'TOGO                                              ', 0, 0),
(231, 772, 'TKL', 'TK', 'TKL', 'TOKELAU                                           ', 'TOKELAU                                           ', 0, 0),
(232, 776, 'TOP', 'TO', 'TON', 'TONGA                                             ', 'TONGA                                             ', 0, 0),
(233, 780, 'TTD', 'TT', 'TTO', 'TRINIDAD I TOBAGO                                 ', 'TRINIDAD AND TOBAGO                               ', 0, 0),
(234, 788, 'TND', 'TN', 'TUN', 'TUNIS                                             ', 'TUNISIA                                           ', 0, 0),
(235, 795, 'TMM', 'TM', 'TKM', 'TURKMENISTAN                                      ', 'TURKMENISTAN                                      ', 0, 0),
(236, 949, 'TRY', 'TR', 'TUR', 'TURSKA                                            ', 'TURKEY                                            ', 0, 0),
(237, 798, 'TUV', 'TV', 'TUV', 'TUVALU                                            ', 'TUVALU                                            ', 0, 0),
(238, 800, 'UGX', 'UG', 'UGA', 'UGANDA                                            ', 'UGANDA                                            ', 0, 0),
(239, 784, 'AED', 'AE', 'ARE', 'UJED. ARAPSKI EMIRATI                             ', 'U.A.E.                                            ', 1, 0),
(240, 581, 'UMI', 'UM', 'UMI', 'UJEDINJ.DRŽ.PACIFIČ.OTOKA                         ', 'UNI.STAT.MINOR OUTLY.ISL.                         ', 0, 0),
(241, 804, 'UAK', 'UA', 'UKR', 'UKRAJINA                                          ', 'UKRAINE                                           ', 0, 0),
(242, 858, 'UYU', 'UY', 'URY', 'URUGVAJ                                           ', 'URUGUAY                                           ', 0, 0),
(243, 860, 'UZS', 'UZ', 'UZB', 'UZBEKISTAN                                        ', 'UZBEKISTAN                                        ', 0, 0),
(244, 548, 'VUV', 'VU', 'VUT', 'VANUATU                                           ', 'VANUATU                                           ', 0, 0),
(245, 336, 'VAT', 'VA', 'VAT', 'VATIKAN                                           ', 'VATICAN CITY STATE                                ', 0, 0),
(246, 826, 'GBP', 'GB', 'GBR', 'VELIKA BRITANIJA                                  ', 'UNITED KINGDOM                                    ', 1, 0),
(247, 862, 'VEB', 'VE', 'VEN', 'VENEZUELA                                         ', 'VENEZUELA                                         ', 0, 0),
(248, 704, 'VND', 'VN', 'VNM', 'VIJETNAM                                          ', 'VIET NAM                                          ', 0, 0),
(249, 180, 'ZRN', 'ZR', 'ZAR', 'ZAIR                                              ', 'ZAIRE                                             ', 0, 0),
(250, 894, 'ZMK', 'ZM', 'ZMB', 'ZAMBIJA                                           ', 'ZAMBIA                                            ', 0, 0),
(251, 732, 'ESH', 'EH', 'ESH', 'ZAPADNA SAHARA                                    ', 'WESTERN SAHARA                                    ', 0, 0),
(252, 132, 'CVE', 'CV', 'CPV', 'ZELENORTSKA REPUBLIKA                             ', 'CAPE VERDE                                        ', 0, 0),
(253, 716, 'ZWD', 'ZW', 'ZWE', 'ZIMBABVE                                          ', 'ZIMBABWE                                          ', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `firma`
--

CREATE TABLE `firma` (
  `id` int(11) NOT NULL,
  `naziv` varchar(255) NOT NULL,
  `adresa` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pib` varchar(15) NOT NULL,
  `pdv` varchar(15) NOT NULL,
  `ziro_racun` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `firma`
--

INSERT INTO `firma` (`id`, `naziv`, `adresa`, `email`, `pib`, `pdv`, `ziro_racun`) VALUES
(1, 'Firma 1', 'Adresa 1', 'email1@email.com', 'pib1', 'pdv1', 'ziro1');

-- --------------------------------------------------------

--
-- Table structure for table `komitent`
--

CREATE TABLE `komitent` (
  `id` int(11) NOT NULL,
  `naziv` varchar(255) NOT NULL,
  `pib` varchar(255) DEFAULT NULL,
  `pdvbroj` varchar(255) DEFAULT NULL,
  `adresa` varchar(255) DEFAULT NULL,
  `telefon` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `ziroracun` varchar(255) DEFAULT NULL,
  `drzava` int(11) DEFAULT NULL,
  `grad` varchar(200) DEFAULT NULL,
  `napomena` varchar(255) DEFAULT NULL,
  `vrsta_komitenta` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `komitent`
--

INSERT INTO `komitent` (`id`, `naziv`, `pib`, `pdvbroj`, `adresa`, `telefon`, `email`, `ziroracun`, `drzava`, `grad`, `napomena`, `vrsta_komitenta`) VALUES
(8, 'oSofija Vujosevic', '12345678', '2345678', 'dfghjkl', '1234567890', 'bababa@gmail.com', 'ui', 1, 'yu', 'u', 1),
(14, 'Atena Vujosevic', 'WWWWW', 'xxxxxxxx', 'dfghjkl', '1234567890', 'mdujjeodo@gmail.com', 'ui', 1, 'yu', 'u', 1);

-- --------------------------------------------------------

--
-- Table structure for table `lokacija`
--

CREATE TABLE `lokacija` (
  `id` int(11) NOT NULL,
  `naziv` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lokacija`
--

INSERT INTO `lokacija` (`id`, `naziv`) VALUES
(1, 'Big Fashion');

-- --------------------------------------------------------

--
-- Table structure for table `ocjena_dogadjaja`
--

CREATE TABLE `ocjena_dogadjaja` (
  `id` int(11) NOT NULL,
  `naziv` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ocjena_dogadjaja`
--

INSERT INTO `ocjena_dogadjaja` (`id`, `naziv`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `operater`
--

CREATE TABLE `operater` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `kljuc` varchar(32) DEFAULT NULL,
  `aktivan` int(1) DEFAULT 1,
  `ime` varchar(255) NOT NULL,
  `telefon` varchar(50) DEFAULT NULL,
  `uloge_id` int(1) DEFAULT 0,
  `firma_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `operater`
--

INSERT INTO `operater` (`id`, `email`, `password`, `kljuc`, `aktivan`, `ime`, `telefon`, `uloge_id`, `firma_id`) VALUES
(1, 'sofija@gmail.com', '$2b$12$1zzWCvAubUZPS5JC6/4WAeg1hLpCLqq79sHcNMC5zalU5HonTJXnO', '1232', 1, 'Veselin', '08955566', 0, 1),
(2, 'svetlana@gmail.com', '$2b$12$SJkwKn35eRjcOkBXOpnsb.oih44mLjlxRpCjf/nFmMzkUKImU1a8a', '1232', 1, 'Veselin', '08955566', 0, 1),
(3, 'marija@gmail.com', '$2b$12$eldIS6y8zggX1dmpQefvxOFcTio3/8FyBQjTrJDpq2VOyoSARM/bi', '1232', 1, 'Marija', '08955566', 0, 1),
(4, 'nikola@gmail.com', '$2b$12$QfSN00vD25V3t/wClWGofeMhiSYjHvTd4qaZSilQdysfifrPmL.Vm', '1232', 1, 'Nikola', '08955566', 0, 1),
(5, 'velimir@gmail.com', '$2b$12$NcvYnnsQfYhGTtwkq4u9Je1U.s8RezYVHxa63xvl10CMSTPD9gCr.', '1232', 1, 'Nikola', '08955566', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `prihodi`
--

CREATE TABLE `prihodi` (
  `id` int(11) NOT NULL,
  `vrsta_prihoda_id` int(11) DEFAULT NULL,
  `status_prihoda_id` int(11) DEFAULT NULL,
  `dogadjaj_id` int(11) NOT NULL,
  `operater_id` int(11) NOT NULL,
  `iznos` decimal(10,2) NOT NULL,
  `opis` text DEFAULT NULL,
  `rok_placanja` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prihodi`
--

INSERT INTO `prihodi` (`id`, `vrsta_prihoda_id`, `status_prihoda_id`, `dogadjaj_id`, `operater_id`, `iznos`, `opis`, `rok_placanja`) VALUES
(1, 1, 1, 3, 4, 4.00, 'AGAGAGAGAGA', '2024-02-12'),
(2, 1, 1, 3, 4, 4.00, 'jhfbshf', '2024-02-12');

-- --------------------------------------------------------

--
-- Table structure for table `privilegije`
--

CREATE TABLE `privilegije` (
  `id` int(11) NOT NULL,
  `privilegija_naziv` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `privilegije`
--

INSERT INTO `privilegije` (`id`, `privilegija_naziv`) VALUES
(1, 'moze_pregled'),
(2, 'moze_novi');

-- --------------------------------------------------------

--
-- Table structure for table `status_prihoda`
--

CREATE TABLE `status_prihoda` (
  `id` int(11) NOT NULL,
  `naziv` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `status_prihoda`
--

INSERT INTO `status_prihoda` (`id`, `naziv`) VALUES
(1, 'Status prihoda 1');

-- --------------------------------------------------------

--
-- Table structure for table `uloge`
--

CREATE TABLE `uloge` (
  `id` int(11) NOT NULL,
  `uloge_naziv` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `uloge_privilegije`
--

CREATE TABLE `uloge_privilegije` (
  `uloge_id` int(11) NOT NULL,
  `privilegije_id` int(11) NOT NULL,
  `app_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vrsta_dogadjaja`
--

CREATE TABLE `vrsta_dogadjaja` (
  `id` int(11) NOT NULL,
  `naziv` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vrsta_dogadjaja`
--

INSERT INTO `vrsta_dogadjaja` (`id`, `naziv`) VALUES
(1, 'Rodjendan');

-- --------------------------------------------------------

--
-- Table structure for table `vrsta_komitenta`
--

CREATE TABLE `vrsta_komitenta` (
  `id` int(11) NOT NULL,
  `naziv` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vrsta_komitenta`
--

INSERT INTO `vrsta_komitenta` (`id`, `naziv`) VALUES
(1, 'Vrsta komitenta 1');

-- --------------------------------------------------------

--
-- Table structure for table `vrsta_prihoda`
--

CREATE TABLE `vrsta_prihoda` (
  `id` int(11) NOT NULL,
  `naziv` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vrsta_prihoda`
--

INSERT INTO `vrsta_prihoda` (`id`, `naziv`) VALUES
(1, 'Vrsta prihoda 1');

-- --------------------------------------------------------

--
-- Table structure for table `vrste_troskova`
--

CREATE TABLE `vrste_troskova` (
  `id` int(11) NOT NULL,
  `naziv` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vrste_troskova`
--

INSERT INTO `vrste_troskova` (`id`, `naziv`) VALUES
(1, 'Vrsta troska 1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `app`
--
ALTER TABLE `app`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dogadjaji`
--
ALTER TABLE `dogadjaji`
  ADD PRIMARY KEY (`id`),
  ADD KEY `komitenti_id` (`komitenti_id`),
  ADD KEY `vrsta_dogadjaja_id` (`vrsta_dogadjaja_id`),
  ADD KEY `status_dogadjaja_id` (`status_dogadjaja_id`),
  ADD KEY `lokacija_id` (`lokacija_id`),
  ADD KEY `ocjena_dogadjaja_id` (`ocjena_dogadjaja_id`),
  ADD KEY `operater_id` (`operater_id`);

--
-- Indexes for table `dogadjaji_raspored`
--
ALTER TABLE `dogadjaji_raspored`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dogadjaj_id` (`dogadjaj_id`),
  ADD KEY `operater_id` (`operater_id`);

--
-- Indexes for table `dogadjaji_status_dogadjaja`
--
ALTER TABLE `dogadjaji_status_dogadjaja`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dogadjaji_zadaci`
--
ALTER TABLE `dogadjaji_zadaci`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dogadjaj_id` (`dogadjaj_id`),
  ADD KEY `operater_id` (`operater_id`);

--
-- Indexes for table `dogadjaj_troskovi`
--
ALTER TABLE `dogadjaj_troskovi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vrstetroka_id` (`vrste_troskova_id`),
  ADD KEY `komitent_id` (`komitent_id`),
  ADD KEY `operater_id` (`operater_id`),
  ADD KEY `fk_dogadjaji_nullable_id` (`dogadjaj_id`);

--
-- Indexes for table `drzave`
--
ALTER TABLE `drzave`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `firma`
--
ALTER TABLE `firma`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `komitent`
--
ALTER TABLE `komitent`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vrsta_komitenta` (`vrsta_komitenta`),
  ADD KEY `drzava` (`drzava`);

--
-- Indexes for table `lokacija`
--
ALTER TABLE `lokacija`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ocjena_dogadjaja`
--
ALTER TABLE `ocjena_dogadjaja`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `operater`
--
ALTER TABLE `operater`
  ADD PRIMARY KEY (`id`),
  ADD KEY `firma_id` (`firma_id`);

--
-- Indexes for table `prihodi`
--
ALTER TABLE `prihodi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vrsta_prihoda_id` (`vrsta_prihoda_id`),
  ADD KEY `status_prihoda_id` (`status_prihoda_id`),
  ADD KEY `dogadjaj_id` (`dogadjaj_id`),
  ADD KEY `operater_id` (`operater_id`);

--
-- Indexes for table `privilegije`
--
ALTER TABLE `privilegije`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status_prihoda`
--
ALTER TABLE `status_prihoda`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `uloge`
--
ALTER TABLE `uloge`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `uloge_privilegije`
--
ALTER TABLE `uloge_privilegije`
  ADD KEY `uloge_privilegije_app_id_fk` (`app_id`),
  ADD KEY `uloge_privilegije_privilegije_id_fk` (`privilegije_id`),
  ADD KEY `uloge_privilegije_uloge_id_fk` (`uloge_id`);

--
-- Indexes for table `vrsta_dogadjaja`
--
ALTER TABLE `vrsta_dogadjaja`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vrsta_komitenta`
--
ALTER TABLE `vrsta_komitenta`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vrsta_prihoda`
--
ALTER TABLE `vrsta_prihoda`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vrste_troskova`
--
ALTER TABLE `vrste_troskova`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `app`
--
ALTER TABLE `app`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dogadjaji`
--
ALTER TABLE `dogadjaji`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `dogadjaji_raspored`
--
ALTER TABLE `dogadjaji_raspored`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `dogadjaji_status_dogadjaja`
--
ALTER TABLE `dogadjaji_status_dogadjaja`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `dogadjaji_zadaci`
--
ALTER TABLE `dogadjaji_zadaci`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `dogadjaj_troskovi`
--
ALTER TABLE `dogadjaj_troskovi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `drzave`
--
ALTER TABLE `drzave`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=254;

--
-- AUTO_INCREMENT for table `firma`
--
ALTER TABLE `firma`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `komitent`
--
ALTER TABLE `komitent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `lokacija`
--
ALTER TABLE `lokacija`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ocjena_dogadjaja`
--
ALTER TABLE `ocjena_dogadjaja`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `operater`
--
ALTER TABLE `operater`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `prihodi`
--
ALTER TABLE `prihodi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `privilegije`
--
ALTER TABLE `privilegije`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `status_prihoda`
--
ALTER TABLE `status_prihoda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `uloge`
--
ALTER TABLE `uloge`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vrsta_dogadjaja`
--
ALTER TABLE `vrsta_dogadjaja`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vrsta_komitenta`
--
ALTER TABLE `vrsta_komitenta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vrsta_prihoda`
--
ALTER TABLE `vrsta_prihoda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vrste_troskova`
--
ALTER TABLE `vrste_troskova`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dogadjaji`
--
ALTER TABLE `dogadjaji`
  ADD CONSTRAINT `dogadjaji_ibfk_1` FOREIGN KEY (`komitenti_id`) REFERENCES `komitent` (`id`),
  ADD CONSTRAINT `dogadjaji_ibfk_2` FOREIGN KEY (`vrsta_dogadjaja_id`) REFERENCES `vrsta_dogadjaja` (`id`),
  ADD CONSTRAINT `dogadjaji_ibfk_3` FOREIGN KEY (`status_dogadjaja_id`) REFERENCES `dogadjaji_status_dogadjaja` (`id`),
  ADD CONSTRAINT `dogadjaji_ibfk_4` FOREIGN KEY (`lokacija_id`) REFERENCES `lokacija` (`id`),
  ADD CONSTRAINT `dogadjaji_ibfk_5` FOREIGN KEY (`ocjena_dogadjaja_id`) REFERENCES `ocjena_dogadjaja` (`id`),
  ADD CONSTRAINT `dogadjaji_ibfk_6` FOREIGN KEY (`operater_id`) REFERENCES `operater` (`id`);

--
-- Constraints for table `dogadjaji_raspored`
--
ALTER TABLE `dogadjaji_raspored`
  ADD CONSTRAINT `dogadjaji_raspored_ibfk_1` FOREIGN KEY (`dogadjaj_id`) REFERENCES `dogadjaji` (`id`),
  ADD CONSTRAINT `dogadjaji_raspored_ibfk_2` FOREIGN KEY (`operater_id`) REFERENCES `operater` (`id`);

--
-- Constraints for table `dogadjaji_zadaci`
--
ALTER TABLE `dogadjaji_zadaci`
  ADD CONSTRAINT `dogadjaji_zadaci_ibfk_1` FOREIGN KEY (`dogadjaj_id`) REFERENCES `dogadjaji` (`id`),
  ADD CONSTRAINT `dogadjaji_zadaci_ibfk_2` FOREIGN KEY (`operater_id`) REFERENCES `operater` (`id`);

--
-- Constraints for table `dogadjaj_troskovi`
--
ALTER TABLE `dogadjaj_troskovi`
  ADD CONSTRAINT `dogadjaj_troskovi_ibfk_2` FOREIGN KEY (`vrste_troskova_id`) REFERENCES `vrste_troskova` (`id`),
  ADD CONSTRAINT `dogadjaj_troskovi_ibfk_3` FOREIGN KEY (`komitent_id`) REFERENCES `komitent` (`id`),
  ADD CONSTRAINT `dogadjaj_troskovi_ibfk_4` FOREIGN KEY (`operater_id`) REFERENCES `operater` (`id`),
  ADD CONSTRAINT `fk_dogadjaji_nullable_id` FOREIGN KEY (`dogadjaj_id`) REFERENCES `dogadjaji` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `komitent`
--
ALTER TABLE `komitent`
  ADD CONSTRAINT `komitent_ibfk_1` FOREIGN KEY (`vrsta_komitenta`) REFERENCES `vrsta_komitenta` (`id`),
  ADD CONSTRAINT `komitent_ibfk_2` FOREIGN KEY (`drzava`) REFERENCES `drzave` (`id`);

--
-- Constraints for table `operater`
--
ALTER TABLE `operater`
  ADD CONSTRAINT `operater_ibfk_1` FOREIGN KEY (`firma_id`) REFERENCES `firma` (`id`);

--
-- Constraints for table `prihodi`
--
ALTER TABLE `prihodi`
  ADD CONSTRAINT `prihodi_ibfk_1` FOREIGN KEY (`vrsta_prihoda_id`) REFERENCES `vrsta_prihoda` (`id`),
  ADD CONSTRAINT `prihodi_ibfk_2` FOREIGN KEY (`status_prihoda_id`) REFERENCES `status_prihoda` (`id`),
  ADD CONSTRAINT `prihodi_ibfk_3` FOREIGN KEY (`dogadjaj_id`) REFERENCES `dogadjaji` (`id`),
  ADD CONSTRAINT `prihodi_ibfk_4` FOREIGN KEY (`operater_id`) REFERENCES `operater` (`id`);

--
-- Constraints for table `uloge_privilegije`
--
ALTER TABLE `uloge_privilegije`
  ADD CONSTRAINT `uloge_privilegije_app_id_fk` FOREIGN KEY (`app_id`) REFERENCES `app` (`id`),
  ADD CONSTRAINT `uloge_privilegije_privilegije_id_fk` FOREIGN KEY (`privilegije_id`) REFERENCES `privilegije` (`id`),
  ADD CONSTRAINT `uloge_privilegije_uloge_id_fk` FOREIGN KEY (`uloge_id`) REFERENCES `uloge` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
