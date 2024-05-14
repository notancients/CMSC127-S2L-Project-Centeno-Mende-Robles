-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: freview1
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ESTABLISHMENT`
--

DROP TABLE IF EXISTS `ESTABLISHMENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ESTABLISHMENT` (
  `establishment_id` int NOT NULL AUTO_INCREMENT,
  `establishment_name` varchar(50) NOT NULL,
  `location` varchar(255) NOT NULL,
  `operating_hours` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`establishment_id`),
  KEY `fk_established_by` (`created_by`),
  CONSTRAINT `fk_established_by` FOREIGN KEY (`created_by`) REFERENCES `USER` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ESTABLISHMENT`
--

LOCK TABLES `ESTABLISHMENT` WRITE;
/*!40000 ALTER TABLE `ESTABLISHMENT` DISABLE KEYS */;
INSERT INTO `ESTABLISHMENT` VALUES (1,'Establishment 1','Dito','MWF 9 - 5 | TTH 7 - 10','2024-05-06 14:48:12',1);
/*!40000 ALTER TABLE `ESTABLISHMENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FOOD`
--

DROP TABLE IF EXISTS `FOOD`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FOOD` (
  `food_id` int NOT NULL AUTO_INCREMENT,
  `food_name` varchar(50) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `establishment_id` int DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`food_id`),
  KEY `fk_food_created_by` (`created_by`),
  KEY `fk_establishment` (`establishment_id`),
  CONSTRAINT `fk_establishment` FOREIGN KEY (`establishment_id`) REFERENCES `ESTABLISHMENT` (`establishment_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_food_created_by` FOREIGN KEY (`created_by`) REFERENCES `USER` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FOOD`
--

LOCK TABLES `FOOD` WRITE;
/*!40000 ALTER TABLE `FOOD` DISABLE KEYS */;
INSERT INTO `FOOD` VALUES (1,'Food 1',20.24,1,'2024-05-06 14:49:49',1),(2,'Menudo ba o Afritada',60.50,1,'2024-05-07 03:31:39',1);
/*!40000 ALTER TABLE `FOOD` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FOOD_CATEGORY`
--

DROP TABLE IF EXISTS `FOOD_CATEGORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FOOD_CATEGORY` (
  `food_id` int NOT NULL,
  `food_category` varchar(50) NOT NULL,
  PRIMARY KEY (`food_id`,`food_category`),
  CONSTRAINT `fk_food_id_category` FOREIGN KEY (`food_id`) REFERENCES `FOOD` (`food_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FOOD_CATEGORY`
--

LOCK TABLES `FOOD_CATEGORY` WRITE;
/*!40000 ALTER TABLE `FOOD_CATEGORY` DISABLE KEYS */;
INSERT INTO `FOOD_CATEGORY` VALUES (1,'Meat');
/*!40000 ALTER TABLE `FOOD_CATEGORY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FOOD_IMAGE`
--

DROP TABLE IF EXISTS `FOOD_IMAGE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FOOD_IMAGE` (
  `food_image_id` int NOT NULL AUTO_INCREMENT,
  `food_id` int DEFAULT NULL,
  `link` text NOT NULL,
  PRIMARY KEY (`food_image_id`),
  KEY `fk_food_id` (`food_id`),
  CONSTRAINT `fk_food_id` FOREIGN KEY (`food_id`) REFERENCES `FOOD` (`food_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FOOD_IMAGE`
--

LOCK TABLES `FOOD_IMAGE` WRITE;
/*!40000 ALTER TABLE `FOOD_IMAGE` DISABLE KEYS */;
/*!40000 ALTER TABLE `FOOD_IMAGE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FOOD_INGREDIENTS`
--

DROP TABLE IF EXISTS `FOOD_INGREDIENTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FOOD_INGREDIENTS` (
  `food_id` int NOT NULL,
  `ingredients` varchar(255) NOT NULL,
  PRIMARY KEY (`food_id`,`ingredients`),
  CONSTRAINT `fk_food_id_ingredients` FOREIGN KEY (`food_id`) REFERENCES `FOOD` (`food_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FOOD_INGREDIENTS`
--

LOCK TABLES `FOOD_INGREDIENTS` WRITE;
/*!40000 ALTER TABLE `FOOD_INGREDIENTS` DISABLE KEYS */;
/*!40000 ALTER TABLE `FOOD_INGREDIENTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `REVIEW`
--

DROP TABLE IF EXISTS `REVIEW`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `REVIEW` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `rating` decimal(2,1) NOT NULL,
  `data_published` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `post_content` text,
  `user_id` int DEFAULT NULL,
  `review_type` int NOT NULL,
  `target_id` int NOT NULL,
  PRIMARY KEY (`review_id`),
  UNIQUE KEY `one_review` (`user_id`,`review_type`,`target_id`),
  KEY `fk_target_food` (`target_id`),
  CONSTRAINT `fk_target_establishment` FOREIGN KEY (`target_id`) REFERENCES `ESTABLISHMENT` (`establishment_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_target_food` FOREIGN KEY (`target_id`) REFERENCES `FOOD` (`food_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `REVIEW`
--

LOCK TABLES `REVIEW` WRITE;
/*!40000 ALTER TABLE `REVIEW` DISABLE KEYS */;
INSERT INTO `REVIEW` VALUES (1,4.5,'2024-05-06 14:51:05','Muspi merol',1,1,1);
/*!40000 ALTER TABLE `REVIEW` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USER` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `user_password` varchar(50) NOT NULL,
  `user_type` varchar(50) DEFAULT 'regular',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
INSERT INTO `USER` VALUES (1,'User 1','Una','1resU','password','regular');
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-07 11:36:40
