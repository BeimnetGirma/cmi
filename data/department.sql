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
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'New Department'),(2,'New Department 2'),(3,'Testing 5'),(4,'ም/_ዋና_ዳይሬክተር '),(5,'ዕቅድ፣ ለውጥና መልካም አስተዳደር '),(6,'የሰው ሀብት ስራ አመራር ዳይሬክቶሬት'),(7,'የአሰራር ስርዓት ማሻሻያ ዳ/ት'),(8,'የኦዲት አገልግሎት ዳይሬክቶሬት'),(9,'የኮ.ማ ባለድርሻ አካላት እና የግሉ ዘርፍ'),(10,'የኮ.ፕ.ማ  ማማከር አገልግሎት ዳይሬክቶሬት'),(11,'የኮሙኒኬሽንና ኢንፎርሜሽን ቴክኖሎጂ ዳይሬክቶሬት'),(12,'የኮንስትራክሽን ማኔጅመንት ቴክኖሎጂ ሽግግር ዳይ'),(13,'የኮንስትራክሽን ማኔጅመንት ጥናትና ምርምር ዳ/ት'),(14,'የኮንስትራክሽን ማኔጅመንት ፈጻሚዎች ልማት ዳ\\ት'),(15,'የኮንስትራክሽን ኢንዱስትሪ ሙያ ብቃት ማረጋገጫ'),(16,'የግዢና ጠቅላላአ ገልግሎት ዳይሬክቶሬት'),(17,'የፋይናንስና ንብረት አስተዳደር ዳይሬክቶሬት'),(18,'የፋይናንስና ንብረት አስተዳደር ዳይሬክቶሬት የፋ'),(19,'ዳይሬክቶሬት የፋይናንስና ንብረት አስተዳደር ዳ'),(20,'ጥናትና_ምርምር');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
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
