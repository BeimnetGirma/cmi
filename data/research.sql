-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 11, 2024 at 06:41 AM
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
-- Table structure for table `research`
--

DROP TABLE IF EXISTS `research`;
CREATE TABLE IF NOT EXISTS `research` (
  `Research_Id` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(150) CHARACTER SET utf8 NOT NULL,
  `Department` varchar(40) CHARACTER SET utf8 NOT NULL,
  `Year` date NOT NULL,
  `Path` varchar(150) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`Research_Id`),
  KEY `Department` (`Department`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `research`
--

INSERT INTO `research` (`Research_Id`, `Title`, `Department`, `Year`, `Path`) VALUES
(1, 'CRUSHED SANDSTONE IN AND AROUND ADIGRAT TOWN', 'ጥናትና_ምርምር', '2019-02-14', 'research/1 CSEB - ADIGRAT REPORT_Teklay.pdf'),
(2, 'DESIGN AND DEVELOPMENT MOBILE CONCRET BLOCK MACHINE', 'ጥናትና_ምርምር', '2019-02-13', 'research/2 design and development mobile block machine docment.pdf'),
(3, 'Investigation of the Impact of Project Implementation Related Problems on Building Life Expectancy', 'ጥናትና_ምርምር', '2019-10-02', 'research/3 ECPMI-HU Research Final Report (October 2019).pdf'),
(4, 'Design and Development of Automatic Machine for Manufacturing Low Cost Roofing Form Sisal Fiber Reinforced Clay', 'ጥናትና_ምርምር', '2019-10-09', 'research/4 FINAL REPORT.pdf'),
(5, 'STRENGTH AND DURABILITY PERFORMANCE OF ADOBE BRICKS WITH PUMICE AGGREGATE AND STABILIZED ORGANIC NATURAL BINDERS', 'ጥናትና_ምርምር', '2019-06-08', 'research/5 hawassa Adobe first draft edited Tariku.pdf'),
(6, 'በአዲስ አበባ የጋራ መኖሪያ ቤቶች ዋጋ መጨመር ላይ የተዘጋጀ የዳሰሳ ጥናት ትንተና', 'ጥናትና_ምርምር', '2015-06-03', 'research/6 Increase of house.pdf'),
(7, 'Automated and mobile block machine', 'ጥናትና_ምርምር', '2019-01-30', 'research/7 Manufacturing process of Automated and mobileblock machine.pdf'),
(8, 'OPERATING & MAINTENANCE INSTRUCTION FOR MOBILE CONCRET BLOCK MACHINE', 'ጥናትና_ምርምር', '2019-02-18', 'research/8 mobile block machine Operational &Maintenance manuall.pdf'),
(9, 'A Study on the Suitability of Quarry Stone Dust as Sand Replacing Material', 'ጥናትና_ምርምር', '2019-02-13', 'research/9 Moges ECPMI Final.pdf'),
(10, 'Study of Quality Management System in Building Construction Firms in Ethiopia', 'ጥናትና_ምርምር', '2019-05-15', 'research/10 QMS Final Draft to ECPMI_Gebrehiwot_Mekele.pdf'),
(11, 'Research', 'ጥናትና_ምርምር', '2020-02-13', 'research/11 Researcg  የ2013 ዕቅድ ሐምሌ.pdf'),
(12, 'የግንባታ አማካሪዎች የኮንስትራክሽን ፕሮጀክት ማኔጅመንት አቅም ክፌተት የዲሰሣ ጥናት', 'ጥናትና_ምርምር', '2016-02-10', 'research/12 Research on consultant.pdf'),
(13, 'የግንባታ ስራ ተቋራጮች የአቅም ክፍተት ዳሰሳ ጥናት ህዳር, 2010 ዓ.ም አዲስአበባ', 'ጥናትና_ምርምር', '2017-02-14', 'research/17 Work Zone Safety Research.pdf'),
(14, 'Structural Quality Defect assessment Study on Building Construction Projects', 'ጥናትና_ምርምር', '2019-03-05', 'research/14 Structural quality defect.pdf'),
(15, 'Web-based Geotechnical Database System for Ethiopian Construction Sectors', 'ጥናትና_ምርምር', '2019-02-20', 'research/15 System_Development_document.pdf'),
(16, 'Web-Based Geotechnical Database Management System (GDMS)', 'ጥናትና_ምርምር', '2019-02-12', 'research/16 User Manual.pdf'),
(17, 'የግንባታ አካባቢ ደህንነት የዳሰሳ ጥናት', 'ጥናትና_ምርምር', '2017-02-14', 'research/17 Work Zone Safety Research.pdf'),
(18, 'Final BIM roadmap ', 'ም/_ዋና_ዳይሬክተር ', '2023-04-26', 'research/Final BIM roadmap Jan 4.pdf'),
(19, 'Final Draft BIM ROADMAP', 'ም/_ዋና_ዳይሬክተር ', '2023-04-12', 'research/Final Draft BIM ROADMAP.pdf'),
(20, 'Draft Final BIM Roadmap', 'ም/_ዋና_ዳይሬክተር ', '2020-03-10', 'research/Draft Final BIM Roadmap-January 2020 event.pdf');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `research`
--
ALTER TABLE `research`
  ADD CONSTRAINT `research_ibfk_1` FOREIGN KEY (`Department`) REFERENCES `department` (`Department_Name`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
