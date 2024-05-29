-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 27, 2023 at 05:13 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dic_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(120) COLLATE utf8_bin NOT NULL,
  `password` varchar(45) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`) VALUES
(1, 'admin@gmail.com', '202cb962ac59075b964b07152d234b70');

-- --------------------------------------------------------

--
-- Table structure for table `missing`
--

CREATE TABLE `missing` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(100) COLLATE utf8_bin NOT NULL,
  `last_name` varchar(100) COLLATE utf8_bin NOT NULL,
  `date_of_birth` datetime NOT NULL,
  `place_of_birth` varchar(100) COLLATE utf8_bin NOT NULL,
  `last_time_seen` datetime NOT NULL,
  `last_place_seen` varchar(45) COLLATE utf8_bin NOT NULL,
  `contact` varchar(45) COLLATE utf8_bin NOT NULL,
  `description` varchar(255) COLLATE utf8_bin NOT NULL,
  `physical_chars` varchar(255) COLLATE utf8_bin NOT NULL,
  `image` varchar(45) COLLATE utf8_bin NOT NULL,
  `status` varchar(45) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `missing`
--

INSERT INTO `missing` (`id`, `first_name`, `last_name`, `date_of_birth`, `place_of_birth`, `last_time_seen`, `last_place_seen`, `contact`, `description`, `physical_chars`, `image`, `status`) VALUES
(1, 'Antonia', 'Lucas', '1982-06-01 00:00:00', 'Suarez, Mexico', '2023-06-06 00:00:00', 'Sarajevo', '38762393345', 'test desc', ',smdhjekl', 'alucas.png', NULL),
(2, 'John', 'Alvez', '2001-09-04 07:30:00', 'Sarajevo, BiH', '2020-09-04 07:30:00', 'Mostar', '43790966', 'cbnhlug fnhk fjz', 'aawr fhj hk', 'jalvez.png', NULL),
(3, 'Chang', 'Mian', '1989-03-23 00:00:00', 'Bejing, China', '2023-02-09 00:00:00', 'London', '0301283\'148', 'djf spfjf ofhsnf glnb', 'čkljfnw psfn', 'cmian.png', 'found');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(200) COLLATE utf8_bin NOT NULL,
  `date` datetime NOT NULL,
  `description` text COLLATE utf8_bin NOT NULL,
  `image` varchar(45) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `title`, `date`, `description`, `image`) VALUES
(1, 'Bomb Squads Safely Handle Decades-Old Military Explosives', '2021-06-04 22:00:00', 'DIC and local police bomb squads are frequently called to homes where decades-old military explosives have been found.', 'bombs.png'),
(2, 'Partnership with Italian Authorities Leads to Artwork Return', '2022-04-09 00:00:00', 'The DIC located and returned several pieces of historic art, including a gold coin and tapestries, back to Italy.', 'italypa.png'),
(3, 'Investigation into Online Drug Vendor Illuminates Counterfeit Pill Danger', '2022-12-08 00:00:00', 'A suspect in Los Angeles was allegedly manufacturing and shipping large quantities of fake pills and other dangerous drugs.', 'onlined.png'),
(5, 'Prolific Drug Trafficking Organization Dismantled', '2022-01-01 23:00:00', 'Agents from the DIC initially began investigating a violent street gang operating in western Pennsylvania beginning in 2018.', 'profilic.png'),
(8, 'Virginia Man Found Guilty of Felony and Misdemeanor', '2023-03-10 23:00:00', 'A Virginia man was found guilty in the District of Columbia today of felony and misdemeanor charges for his actions during the Jan. 6, 2021, Capitol breach.', 'virginia.png'),
(50, 'c', '2023-03-12 00:00:00', 'dffh', 'virginia.png');

-- --------------------------------------------------------

--
-- Table structure for table `newsletter`
--

CREATE TABLE `newsletter` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(55) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `newsletter`
--

INSERT INTO `newsletter` (`id`, `email`) VALUES
(1, 'haris.sabotic@stu.ibu.edu.ba');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(100) COLLATE utf8_bin NOT NULL,
  `last_name` varchar(100) COLLATE utf8_bin NOT NULL,
  `date_of_birth` datetime NOT NULL,
  `phone` varchar(20) COLLATE utf8_bin NOT NULL,
  `email` varchar(50) COLLATE utf8_bin NOT NULL,
  `city` varchar(55) COLLATE utf8_bin NOT NULL,
  `country` varchar(55) COLLATE utf8_bin NOT NULL,
  `zip` varchar(10) COLLATE utf8_bin NOT NULL,
  `category` varchar(25) COLLATE utf8_bin NOT NULL,
  `description` text COLLATE utf8_bin NOT NULL,
  `status` varchar(30) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `first_name`, `last_name`, `date_of_birth`, `phone`, `email`, `city`, `country`, `zip`, `category`, `description`, `status`) VALUES
(1, 'John', 'Smith', '1985-05-02 00:00:00', '0603433955', 'john.smith@gmail.com', 'NYC', 'US', '1200', 'Terrorism', 'Uzasssssss je ovoooooooooo', 'in-process'),
(2, 'Samantha', 'Cristy', '1968-01-08 00:00:00', '3628973', 'suvad.k@gmail.com', 'SA', 'BIH', '71000', 'Drug Trafficking', 'GHH DHSJS DDJJS SHDJW SUAJAWH WUSJJ', 'in-process'),
(3, 'Emiliano', 'Poetzi', '1966-01-01 00:00:00', '37283', 'seida@gmail.com', 'SA', 'BIH', '71000', 'Cyber Crime', 'SJB DKSHL DKLSFHN OSFHSN LHDLWHN', 'finished'),
(4, 'Ende', 'Amani', '1998-12-25 00:00:00', '28347839', 'ende.amani@gmail.com', 'London', 'UK', '12000', 'Drug Trafficking', 'sdfgj fvbhtj fhtj fgfg rhjuiz z 75 thgn ', 'finished'),
(5, 'Emi', 'Alonso', '2001-04-04 00:00:00', '1298384859', 'emi-alonso@gmail.com', 'Madrid', 'Spain', '20200', 'Civil Rights', 'dmkkaio wowihd wodhd wodhs q0eo dlxkcn', 'finished'),
(6, 'Jonathan', 'Vollen', '2002-12-02 00:00:00', '0370347', 'jonathan_v@gmail.com', 'Chicago', 'US', '1250', 'Public Corruption', 'dlfjs srliue ewkuersh,n ckxnxo fer  bfhf rdf t', 'in-process'),
(7, 'Chloe', 'Chicko', '2000-05-05 00:00:00', '040284', 'chloechicko@gmail.com', 'Las Vegas', 'US', '1130', 'Organized Crime', 'flkjrpios wq qef t c s fgd ssf', 'canceled');

-- --------------------------------------------------------

--
-- Table structure for table `wanted`
--

CREATE TABLE `wanted` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(100) COLLATE utf8_bin NOT NULL,
  `last_name` varchar(100) COLLATE utf8_bin NOT NULL,
  `image` varchar(150) COLLATE utf8_bin NOT NULL,
  `description` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `wanted`
--

INSERT INTO `wanted` (`id`, `first_name`, `last_name`, `image`, `description`) VALUES
(2, 'Amanda', 'Sanchez', 'asanchez.png', 'Shoplifter'),
(5, 'John', 'Smith', 'jsmith.png', 'Robber, murder, shoplifter'),
(6, 'Kristina', 'Valdez', 'kvaldez.png', 'Murder, Shoplifter'),
(25, 'Adnan', 'Smith', 'jsmith.png', 'dfgh'),
(26, 'Amila', 'Causevic', 'acausevic.png', 'sdfgh'),
(27, 'Amina', 'Kodzaga', 'akodzaga.png', 'wertz');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `missing`
--
ALTER TABLE `missing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `newsletter`
--
ALTER TABLE `newsletter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wanted`
--
ALTER TABLE `wanted`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `missing`
--
ALTER TABLE `missing`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `newsletter`
--
ALTER TABLE `newsletter`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `wanted`
--
ALTER TABLE `wanted`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
