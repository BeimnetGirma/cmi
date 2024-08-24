-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ghost
-- ------------------------------------------------------
-- Server version	5.7.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `research`
--

DROP TABLE IF EXISTS `research`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `research` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) CHARACTER SET utf8 NOT NULL,
  `year` date NOT NULL,
  `path` varchar(150) CHARACTER SET utf8 NOT NULL,
  `deptId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dept_fk_idx` (`deptId`),
  CONSTRAINT `dept_fk` FOREIGN KEY (`deptId`) REFERENCES `department` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `research`
--

LOCK TABLES `research` WRITE;
/*!40000 ALTER TABLE `research` DISABLE KEYS */;
INSERT INTO `research` VALUES (1,'CRUSHED SANDSTONE IN AND AROUND ADIGRAT TOWN','2019-02-14','research/1 CSEB - ADIGRAT REPORT_Teklay.pdf',20),(2,'DESIGN AND DEVELOPMENT MOBILE CONCRET BLOCK MACHINE','2019-02-13','research/2 design and development mobile block machine docment.pdf',20),(3,'Investigation of the Impact of Project Implementation Related Problems on Building Life Expectancy','2019-10-02','research/3 ECPMI-HU Research Final Report (October 2019).pdf',20),(4,'Design and Development of Automatic Machine for Manufacturing Low Cost Roofing Form Sisal Fiber Reinforced Clay','2019-10-09','research/4 FINAL REPORT.pdf',20),(5,'STRENGTH AND DURABILITY PERFORMANCE OF ADOBE BRICKS WITH PUMICE AGGREGATE AND STABILIZED ORGANIC NATURAL BINDERS','2019-06-08','research/5 hawassa Adobe first draft edited Tariku.pdf',20),(6,'በአዲስ አበባ የጋራ መኖሪያ ቤቶች ዋጋ መጨመር ላይ የተዘጋጀ የዳሰሳ ጥናት ትንተና','2015-06-03','research/6 Increase of house.pdf',20),(7,'Automated and mobile block machine','2019-01-30','research/7 Manufacturing process of Automated and mobileblock machine.pdf',20),(8,'OPERATING & MAINTENANCE INSTRUCTION FOR MOBILE CONCRET BLOCK MACHINE','2019-02-18','research/8 mobile block machine Operational &Maintenance manuall.pdf',20),(9,'A Study on the Suitability of Quarry Stone Dust as Sand Replacing Material','2019-02-13','research/9 Moges ECPMI Final.pdf',20),(10,'Study of Quality Management System in Building Construction Firms in Ethiopia','2019-05-15','research/10 QMS Final Draft to ECPMI_Gebrehiwot_Mekele.pdf',20),(11,'Research','2020-02-13','research/11 Researcg  የ2013 ዕቅድ ሐምሌ.pdf',20),(12,'የግንባታ አማካሪዎች የኮንስትራክሽን ፕሮጀክት ማኔጅመንት አቅም ክፌተት የዲሰሣ ጥናት','2016-02-10','research/12 Research on consultant.pdf',20),(13,'የግንባታ ስራ ተቋራጮች የአቅም ክፍተት ዳሰሳ ጥናት ህዳር, 2010 ዓ.ም አዲስአበባ','2017-02-14','research/17 Work Zone Safety Research.pdf',20),(14,'Structural Quality Defect assessment Study on Building Construction Projects','2019-03-05','research/14 Structural quality defect.pdf',20),(15,'Web-based Geotechnical Database System for Ethiopian Construction Sectors','2019-02-20','research/15 System_Development_document.pdf',20),(16,'Web-Based Geotechnical Database Management System (GDMS)','2019-02-12','research/16 User Manual.pdf',20),(17,'የግንባታ አካባቢ ደህንነት የዳሰሳ ጥናት','2017-02-14','research/17 Work Zone Safety Research.pdf',20),(18,'Final BIM roadmap ','2023-04-26','research/Final BIM roadmap Jan 4.pdf',4),(19,'Final Draft BIM ROADMAP','2023-04-12','research/Final Draft BIM ROADMAP.pdf',4),(20,'Draft Final BIM Roadmap','2020-03-10','research/Draft Final BIM Roadmap-January 2020 event.pdf',4),(46,'Testing','2024-07-29','',6),(48,'Testing 2','2024-07-29','',8);
/*!40000 ALTER TABLE `research` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-24 11:56:49
