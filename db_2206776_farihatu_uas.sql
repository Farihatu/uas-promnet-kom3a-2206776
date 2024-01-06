-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 06, 2024 at 07:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_2206776_farihatu_uas`
--

-- --------------------------------------------------------

--
-- Table structure for table `pasien_puskesmas_farihatu`
--

CREATE TABLE `pasien_puskesmas_farihatu` (
  `id` int(11) NOT NULL,
  `nama` varchar(200) NOT NULL,
  `usia` int(11) NOT NULL,
  `jenis_kelamin` char(2) NOT NULL,
  `alamat` varchar(200) NOT NULL,
  `deskripsi` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pasien_puskesmas_farihatu`
--

INSERT INTO `pasien_puskesmas_farihatu` (`id`, `nama`, `usia`, `jenis_kelamin`, `alamat`, `deskripsi`) VALUES
(1, 'Utria Efaludini ', 19, 'P', 'Cianjur', 'Sakit gigi'),
(2, 'Yasmin Aqilah', 20, 'P', 'Garut', 'Sakit kepala'),
(3, 'Hikmah Nurarifah', 19, 'P', 'Karawang', 'Demam'),
(5, 'Fadli Ridwansyah', 19, 'L', 'Bandung', 'Sakit mata'),
(28, 'inria', 14, 'P', 'bandung', 'sakit tipes'),
(49, 'shanny', 22, 'L', 'sukabumi', 'sakit tenggorokan');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pasien_puskesmas_farihatu`
--
ALTER TABLE `pasien_puskesmas_farihatu`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pasien_puskesmas_farihatu`
--
ALTER TABLE `pasien_puskesmas_farihatu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
