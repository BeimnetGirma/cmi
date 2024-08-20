-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 11, 2024 at 06:42 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cmi`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
CREATE TABLE IF NOT EXISTS `department` (
  `Department_Name` varchar(40) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`Department_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`Department_Name`) VALUES
('ም/_ዋና_ዳይሬክተር '),
('ዕቅድ፣ ለውጥና መልካም አስተዳደር '),
('የሰው ሀብት ስራ አመራር ዳይሬክቶሬት'),
('የአሰራር ስርዓት ማሻሻያ ዳ/ት'),
('የኦዲት አገልግሎት ዳይሬክቶሬት'),
('የኮ.ማ ባለድርሻ አካላት እና የግሉ ዘርፍ'),
('የኮ.ፕ.ማ  ማማከር አገልግሎት ዳይሬክቶሬት'),
('የኮሙኒኬሽንና ኢንፎርሜሽን ቴክኖሎጂ ዳይሬክቶሬት'),
('የኮንስትራክሽን ማኔጅመንት ቴክኖሎጂ ሽግግር ዳይ'),
('የኮንስትራክሽን ማኔጅመንት ጥናትና ምርምር ዳ/ት'),
('የኮንስትራክሽን ማኔጅመንት ፈጻሚዎች ልማት ዳ\\ት'),
('የኮንስትራክሽን ኢንዱስትሪ ሙያ ብቃት ማረጋገጫ'),
('የግዢና ጠቅላላአ ገልግሎት ዳይሬክቶሬት'),
('የፋይናንስና ንብረት አስተዳደር ዳይሬክቶሬት'),
('የፋይናንስና ንብረት አስተዳደር ዳይሬክቶሬት የፋ'),
('ዳይሬክቶሬት የፋይናንስና ንብረት አስተዳደር ዳ'),
('ጥናትና_ምርምር');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
