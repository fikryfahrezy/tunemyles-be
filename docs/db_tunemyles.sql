-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_tunemyles_test
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `m_banks`
--

DROP TABLE IF EXISTS `m_banks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `m_banks` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `bank_name` varchar(255) NOT NULL,
  `id_logo` int unsigned DEFAULT NULL,
  `is_visible` int DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_logo` (`id_logo`),
  CONSTRAINT `m_banks_ibfk_1` FOREIGN KEY (`id_logo`) REFERENCES `m_medias` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_banks`
--

LOCK TABLES `m_banks` WRITE;
/*!40000 ALTER TABLE `m_banks` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_banks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `m_categories`
--

DROP TABLE IF EXISTS `m_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `m_categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  `slug` text NOT NULL,
  `description` text,
  `id_icon` int unsigned DEFAULT NULL,
  `is_visible` int DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_icon` (`id_icon`),
  CONSTRAINT `m_categories_ibfk_1` FOREIGN KEY (`id_icon`) REFERENCES `m_medias` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_categories`
--

LOCK TABLES `m_categories` WRITE;
/*!40000 ALTER TABLE `m_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `m_faq`
--

DROP TABLE IF EXISTS `m_faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `m_faq` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_faq`
--

LOCK TABLES `m_faq` WRITE;
/*!40000 ALTER TABLE `m_faq` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_faq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `m_medias`
--

DROP TABLE IF EXISTS `m_medias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `m_medias` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `uri` text NOT NULL,
  `label` varchar(255) NOT NULL,
  `is_visible` int DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_medias`
--

LOCK TABLES `m_medias` WRITE;
/*!40000 ALTER TABLE `m_medias` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_medias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `m_products`
--

DROP TABLE IF EXISTS `m_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `m_products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_m_users` int unsigned NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `description` text,
  `id_cover` int unsigned DEFAULT NULL,
  `is_visible` int DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_m_users` (`id_m_users`),
  KEY `id_cover` (`id_cover`),
  CONSTRAINT `m_products_ibfk_1` FOREIGN KEY (`id_m_users`) REFERENCES `m_users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_products_ibfk_2` FOREIGN KEY (`id_cover`) REFERENCES `m_medias` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_products`
--

LOCK TABLES `m_products` WRITE;
/*!40000 ALTER TABLE `m_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `m_users`
--

DROP TABLE IF EXISTS `m_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `m_users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `id_photo` int unsigned DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `phone_number` (`phone_number`),
  KEY `id_photo` (`id_photo`),
  CONSTRAINT `m_users_ibfk_1` FOREIGN KEY (`id_photo`) REFERENCES `m_medias` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_users`
--

LOCK TABLES `m_users` WRITE;
/*!40000 ALTER TABLE `m_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `m_wallets`
--

DROP TABLE IF EXISTS `m_wallets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `m_wallets` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `wallet_name` varchar(255) NOT NULL,
  `wallet_description` varchar(255) NOT NULL,
  `id_logo` int unsigned DEFAULT NULL,
  `is_visible` int DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_logo` (`id_logo`),
  CONSTRAINT `m_wallets_ibfk_1` FOREIGN KEY (`id_logo`) REFERENCES `m_medias` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_wallets`
--

LOCK TABLES `m_wallets` WRITE;
/*!40000 ALTER TABLE `m_wallets` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_wallets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u_bank`
--

DROP TABLE IF EXISTS `u_bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `u_bank` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_m_banks` int unsigned NOT NULL,
  `step` text NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_m_banks` (`id_m_banks`),
  CONSTRAINT `u_bank_ibfk_1` FOREIGN KEY (`id_m_banks`) REFERENCES `m_banks` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u_bank`
--

LOCK TABLES `u_bank` WRITE;
/*!40000 ALTER TABLE `u_bank` DISABLE KEYS */;
/*!40000 ALTER TABLE `u_bank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u_bank_account`
--

DROP TABLE IF EXISTS `u_bank_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `u_bank_account` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_m_banks` int unsigned NOT NULL,
  `account_number` varchar(255) NOT NULL,
  `account_name` varchar(255) NOT NULL,
  `is_visible` int DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_m_banks` (`id_m_banks`),
  CONSTRAINT `u_bank_account_ibfk_1` FOREIGN KEY (`id_m_banks`) REFERENCES `m_banks` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u_bank_account`
--

LOCK TABLES `u_bank_account` WRITE;
/*!40000 ALTER TABLE `u_bank_account` DISABLE KEYS */;
/*!40000 ALTER TABLE `u_bank_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u_product`
--

DROP TABLE IF EXISTS `u_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `u_product` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_m_products` int unsigned NOT NULL,
  `price_default` bigint DEFAULT '0',
  `price_selling` bigint DEFAULT '0',
  `qty` bigint DEFAULT '0',
  `discount` int DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_m_products` (`id_m_products`),
  CONSTRAINT `u_product_ibfk_1` FOREIGN KEY (`id_m_products`) REFERENCES `m_products` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u_product`
--

LOCK TABLES `u_product` WRITE;
/*!40000 ALTER TABLE `u_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `u_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u_product_categories`
--

DROP TABLE IF EXISTS `u_product_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `u_product_categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_u_product` int unsigned NOT NULL,
  `id_m_categories` int unsigned NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_u_product` (`id_u_product`),
  KEY `id_m_categories` (`id_m_categories`),
  CONSTRAINT `u_product_categories_ibfk_1` FOREIGN KEY (`id_u_product`) REFERENCES `u_product` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `u_product_categories_ibfk_2` FOREIGN KEY (`id_m_categories`) REFERENCES `m_categories` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u_product_categories`
--

LOCK TABLES `u_product_categories` WRITE;
/*!40000 ALTER TABLE `u_product_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `u_product_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u_product_photos`
--

DROP TABLE IF EXISTS `u_product_photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `u_product_photos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_u_product` int unsigned NOT NULL,
  `id_m_medias` int unsigned NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_u_product` (`id_u_product`),
  KEY `id_m_medias` (`id_m_medias`),
  CONSTRAINT `u_product_photos_ibfk_1` FOREIGN KEY (`id_u_product`) REFERENCES `u_product` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `u_product_photos_ibfk_2` FOREIGN KEY (`id_m_medias`) REFERENCES `m_medias` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u_product_photos`
--

LOCK TABLES `u_product_photos` WRITE;
/*!40000 ALTER TABLE `u_product_photos` DISABLE KEYS */;
/*!40000 ALTER TABLE `u_product_photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u_user`
--

DROP TABLE IF EXISTS `u_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `u_user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_m_users` int unsigned NOT NULL,
  `api_token` varchar(255) NOT NULL,
  `type` int DEFAULT '0',
  `type_before_banned` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_m_users` (`id_m_users`),
  CONSTRAINT `u_user_ibfk_1` FOREIGN KEY (`id_m_users`) REFERENCES `m_users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u_user`
--

LOCK TABLES `u_user` WRITE;
/*!40000 ALTER TABLE `u_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `u_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u_user_bank_account`
--

DROP TABLE IF EXISTS `u_user_bank_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `u_user_bank_account` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_m_banks` int unsigned NOT NULL,
  `id_m_users` int unsigned NOT NULL,
  `account_number` varchar(255) NOT NULL,
  `account_name` varchar(255) NOT NULL,
  `is_visible` int DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_m_banks` (`id_m_banks`),
  KEY `id_m_users` (`id_m_users`),
  CONSTRAINT `u_user_bank_account_ibfk_1` FOREIGN KEY (`id_m_banks`) REFERENCES `m_banks` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `u_user_bank_account_ibfk_2` FOREIGN KEY (`id_m_users`) REFERENCES `m_users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u_user_bank_account`
--

LOCK TABLES `u_user_bank_account` WRITE;
/*!40000 ALTER TABLE `u_user_bank_account` DISABLE KEYS */;
/*!40000 ALTER TABLE `u_user_bank_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u_user_cart`
--

DROP TABLE IF EXISTS `u_user_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `u_user_cart` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_m_users` int unsigned NOT NULL,
  `id_merchant` int unsigned NOT NULL,
  `id_m_products` int unsigned NOT NULL,
  `qty` bigint DEFAULT '0',
  `status` int DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_m_users` (`id_m_users`),
  KEY `id_merchant` (`id_merchant`),
  KEY `id_m_products` (`id_m_products`),
  CONSTRAINT `u_user_cart_ibfk_1` FOREIGN KEY (`id_m_users`) REFERENCES `m_users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `u_user_cart_ibfk_2` FOREIGN KEY (`id_merchant`) REFERENCES `m_users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `u_user_cart_ibfk_3` FOREIGN KEY (`id_m_products`) REFERENCES `m_products` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u_user_cart`
--

LOCK TABLES `u_user_cart` WRITE;
/*!40000 ALTER TABLE `u_user_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `u_user_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u_user_chat`
--

DROP TABLE IF EXISTS `u_user_chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `u_user_chat` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_m_users` int unsigned NOT NULL,
  `id_cs` int unsigned NOT NULL,
  `chat_token` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_m_users_uuch` (`id_m_users`),
  KEY `fk_id_cs_uuch` (`id_cs`),
  CONSTRAINT `fk_id_cs_uuch` FOREIGN KEY (`id_cs`) REFERENCES `m_users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_m_users_uuch` FOREIGN KEY (`id_m_users`) REFERENCES `m_users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u_user_chat`
--

LOCK TABLES `u_user_chat` WRITE;
/*!40000 ALTER TABLE `u_user_chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `u_user_chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u_user_chat_detail`
--

DROP TABLE IF EXISTS `u_user_chat_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `u_user_chat_detail` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_u_user_chat` int unsigned NOT NULL,
  `id_m_users` int unsigned NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_m_users_uucd` (`id_m_users`),
  KEY `fk_id_u_user_chat_uucd` (`id_u_user_chat`),
  CONSTRAINT `fk_id_m_users_uucd` FOREIGN KEY (`id_m_users`) REFERENCES `m_users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_u_user_chat_uucd` FOREIGN KEY (`id_u_user_chat`) REFERENCES `u_user_chat` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u_user_chat_detail`
--

LOCK TABLES `u_user_chat_detail` WRITE;
/*!40000 ALTER TABLE `u_user_chat_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `u_user_chat_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u_user_is_merchant`
--

DROP TABLE IF EXISTS `u_user_is_merchant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `u_user_is_merchant` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_u_user` int unsigned NOT NULL,
  `no_identity` varchar(16) NOT NULL,
  `id_identity_photo` int unsigned NOT NULL,
  `id_market_photo` int unsigned NOT NULL,
  `market_name` varchar(255) NOT NULL,
  `market_address` text NOT NULL,
  `market_lat` double DEFAULT '0',
  `market_lon` double DEFAULT '0',
  `market_close_time` varchar(20) NOT NULL,
  `is_visible` int DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `u_user_is_merchant_UN` (`no_identity`),
  KEY `id_u_user` (`id_u_user`),
  KEY `id_identity_photo` (`id_identity_photo`),
  KEY `id_market_photo` (`id_market_photo`),
  CONSTRAINT `u_user_is_merchant_ibfk_1` FOREIGN KEY (`id_u_user`) REFERENCES `u_user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `u_user_is_merchant_ibfk_2` FOREIGN KEY (`id_identity_photo`) REFERENCES `m_medias` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `u_user_is_merchant_ibfk_3` FOREIGN KEY (`id_market_photo`) REFERENCES `m_medias` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u_user_is_merchant`
--

LOCK TABLES `u_user_is_merchant` WRITE;
/*!40000 ALTER TABLE `u_user_is_merchant` DISABLE KEYS */;
/*!40000 ALTER TABLE `u_user_is_merchant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u_user_is_merchant_location`
--

DROP TABLE IF EXISTS `u_user_is_merchant_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `u_user_is_merchant_location` (
  `id_u_user_is_merchant` int unsigned NOT NULL,
  `province_id` int NOT NULL,
  `province` varchar(255) NOT NULL,
  `city_id` int NOT NULL,
  `city` varchar(255) NOT NULL,
  `suburbs_id` int NOT NULL,
  `suburbs` varchar(255) NOT NULL,
  `area_id` int NOT NULL,
  `area` varchar(255) NOT NULL,
  `post_code` int NOT NULL,
  `address` text NOT NULL,
  KEY `id_u_user_is_merchant` (`id_u_user_is_merchant`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u_user_is_merchant_location`
--

LOCK TABLES `u_user_is_merchant_location` WRITE;
/*!40000 ALTER TABLE `u_user_is_merchant_location` DISABLE KEYS */;
/*!40000 ALTER TABLE `u_user_is_merchant_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u_user_lost_password`
--

DROP TABLE IF EXISTS `u_user_lost_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `u_user_lost_password` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_u_user` int unsigned NOT NULL,
  `verification_token` varchar(255) NOT NULL,
  `status` int DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_u_user` (`id_u_user`),
  CONSTRAINT `u_user_lost_password_ibfk_1` FOREIGN KEY (`id_u_user`) REFERENCES `u_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u_user_lost_password`
--

LOCK TABLES `u_user_lost_password` WRITE;
/*!40000 ALTER TABLE `u_user_lost_password` DISABLE KEYS */;
/*!40000 ALTER TABLE `u_user_lost_password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u_user_transaction`
--

DROP TABLE IF EXISTS `u_user_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `u_user_transaction` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_m_users` int unsigned NOT NULL,
  `id_merchant` int unsigned NOT NULL,
  `transaction_token` varchar(255) NOT NULL,
  `total_price` bigint DEFAULT '0',
  `status` int DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_m_users` (`id_m_users`),
  KEY `id_merchant` (`id_merchant`),
  CONSTRAINT `u_user_transaction_ibfk_1` FOREIGN KEY (`id_m_users`) REFERENCES `m_users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `u_user_transaction_ibfk_2` FOREIGN KEY (`id_merchant`) REFERENCES `m_users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u_user_transaction`
--

LOCK TABLES `u_user_transaction` WRITE;
/*!40000 ALTER TABLE `u_user_transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `u_user_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u_user_transaction_product_reviews`
--

DROP TABLE IF EXISTS `u_user_transaction_product_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `u_user_transaction_product_reviews` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_u_user_transaction_products` int unsigned NOT NULL,
  `rating` int DEFAULT '1',
  `review` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_u_user_transaction_products` (`id_u_user_transaction_products`),
  CONSTRAINT `u_user_transaction_product_reviews_ibfk_1` FOREIGN KEY (`id_u_user_transaction_products`) REFERENCES `u_user_transaction_products` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u_user_transaction_product_reviews`
--

LOCK TABLES `u_user_transaction_product_reviews` WRITE;
/*!40000 ALTER TABLE `u_user_transaction_product_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `u_user_transaction_product_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u_user_transaction_products`
--

DROP TABLE IF EXISTS `u_user_transaction_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `u_user_transaction_products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_u_user_transaction` int unsigned NOT NULL,
  `id_m_products` int unsigned NOT NULL,
  `qty` bigint DEFAULT '0',
  `transaction_token` varchar(255) NOT NULL,
  `sub_total_price` bigint DEFAULT '0',
  `status` int DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_u_user_transaction` (`id_u_user_transaction`),
  KEY `id_m_products` (`id_m_products`),
  CONSTRAINT `u_user_transaction_products_ibfk_1` FOREIGN KEY (`id_u_user_transaction`) REFERENCES `u_user_transaction` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `u_user_transaction_products_ibfk_2` FOREIGN KEY (`id_m_products`) REFERENCES `m_products` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u_user_transaction_products`
--

LOCK TABLES `u_user_transaction_products` WRITE;
/*!40000 ALTER TABLE `u_user_transaction_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `u_user_transaction_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u_user_wallet`
--

DROP TABLE IF EXISTS `u_user_wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `u_user_wallet` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_u_user` int unsigned NOT NULL,
  `id_m_wallets` int unsigned DEFAULT NULL,
  `balance` bigint DEFAULT '0',
  `is_visible` int DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_u_user` (`id_u_user`),
  KEY `id_m_wallets` (`id_m_wallets`),
  CONSTRAINT `u_user_wallet_ibfk_1` FOREIGN KEY (`id_u_user`) REFERENCES `u_user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `u_user_wallet_ibfk_2` FOREIGN KEY (`id_m_wallets`) REFERENCES `m_wallets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u_user_wallet`
--

LOCK TABLES `u_user_wallet` WRITE;
/*!40000 ALTER TABLE `u_user_wallet` DISABLE KEYS */;
/*!40000 ALTER TABLE `u_user_wallet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u_user_wallet_top_up`
--

DROP TABLE IF EXISTS `u_user_wallet_top_up`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `u_user_wallet_top_up` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_u_user_wallet` int unsigned NOT NULL,
  `id_m_banks` int unsigned NOT NULL,
  `balance_request` bigint DEFAULT '0',
  `balance_transfer` bigint DEFAULT '0',
  `status` int DEFAULT '1',
  `proof_id` int unsigned DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_u_user_wallet` (`id_u_user_wallet`),
  KEY `id_m_banks` (`id_m_banks`),
  KEY `proof_id` (`proof_id`),
  CONSTRAINT `u_user_wallet_top_up_ibfk_1` FOREIGN KEY (`id_u_user_wallet`) REFERENCES `u_user_wallet` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `u_user_wallet_top_up_ibfk_2` FOREIGN KEY (`id_m_banks`) REFERENCES `m_banks` (`id`),
  CONSTRAINT `u_user_wallet_top_up_ibfk_3` FOREIGN KEY (`proof_id`) REFERENCES `m_medias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u_user_wallet_top_up`
--

LOCK TABLES `u_user_wallet_top_up` WRITE;
/*!40000 ALTER TABLE `u_user_wallet_top_up` DISABLE KEYS */;
/*!40000 ALTER TABLE `u_user_wallet_top_up` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u_user_wallet_withdraw`
--

DROP TABLE IF EXISTS `u_user_wallet_withdraw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `u_user_wallet_withdraw` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_u_user_wallet` int unsigned NOT NULL,
  `id_u_user_bank_account` int unsigned NOT NULL,
  `balance_request` bigint DEFAULT '0',
  `status` int DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_u_user_wallet` (`id_u_user_wallet`),
  KEY `id_u_user_bank_account` (`id_u_user_bank_account`),
  CONSTRAINT `u_user_wallet_withdraw_ibfk_1` FOREIGN KEY (`id_u_user_wallet`) REFERENCES `u_user_wallet` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `u_user_wallet_withdraw_ibfk_2` FOREIGN KEY (`id_u_user_bank_account`) REFERENCES `u_user_bank_account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u_user_wallet_withdraw`
--

LOCK TABLES `u_user_wallet_withdraw` WRITE;
/*!40000 ALTER TABLE `u_user_wallet_withdraw` DISABLE KEYS */;
/*!40000 ALTER TABLE `u_user_wallet_withdraw` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `v_cart_active`
--

DROP TABLE IF EXISTS `v_cart_active`;
/*!50001 DROP VIEW IF EXISTS `v_cart_active`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_cart_active` AS SELECT 
 1 AS `id`,
 1 AS `buyer_id`,
 1 AS `merchant_id`,
 1 AS `product_id`,
 1 AS `qty`,
 1 AS `status`,
 1 AS `product_name`,
 1 AS `description`,
 1 AS `cover_label`,
 1 AS `cover_url`,
 1 AS `normal_price`,
 1 AS `selling_price`,
 1 AS `discount`,
 1 AS `available_qty`,
 1 AS `created_at`,
 1 AS `updated_at`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_merchant`
--

DROP TABLE IF EXISTS `v_merchant`;
/*!50001 DROP VIEW IF EXISTS `v_merchant`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_merchant` AS SELECT 
 1 AS `merchant_id`,
 1 AS `full_name`,
 1 AS `phone_number`,
 1 AS `market_id`,
 1 AS `market_name`,
 1 AS `market_address`,
 1 AS `market_lat`,
 1 AS `market_long`,
 1 AS `market_close_time`,
 1 AS `photo_id`,
 1 AS `photo_label`,
 1 AS `photo_url`,
 1 AS `identity_id`,
 1 AS `identity_label`,
 1 AS `identity_url`,
 1 AS `status`,
 1 AS `created_at`,
 1 AS `updated_at`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_products`
--

DROP TABLE IF EXISTS `v_products`;
/*!50001 DROP VIEW IF EXISTS `v_products`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_products` AS SELECT 
 1 AS `id`,
 1 AS `product_util_id`,
 1 AS `product_name`,
 1 AS `description`,
 1 AS `status`,
 1 AS `normal_price`,
 1 AS `selling_price`,
 1 AS `qty`,
 1 AS `discount`,
 1 AS `cover_label`,
 1 AS `cover_url`,
 1 AS `merchant_id`,
 1 AS `market_id`,
 1 AS `market_name`,
 1 AS `market_address`,
 1 AS `market_close_time`,
 1 AS `market_status`,
 1 AS `photo_label`,
 1 AS `photo_url`,
 1 AS `created_at`,
 1 AS `updated_at`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_user_transaction`
--

DROP TABLE IF EXISTS `v_user_transaction`;
/*!50001 DROP VIEW IF EXISTS `v_user_transaction`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_user_transaction` AS SELECT 
 1 AS `id`,
 1 AS `buyer_id`,
 1 AS `transaction_token`,
 1 AS `total_price`,
 1 AS `status`,
 1 AS `full_name`,
 1 AS `phone_number`,
 1 AS `address`,
 1 AS `profile_label`,
 1 AS `profile_url`,
 1 AS `merchant_id`,
 1 AS `market_id`,
 1 AS `market_name`,
 1 AS `photo_label`,
 1 AS `photo_url`,
 1 AS `created_at`,
 1 AS `updated_at`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_user_transaction_products`
--

DROP TABLE IF EXISTS `v_user_transaction_products`;
/*!50001 DROP VIEW IF EXISTS `v_user_transaction_products`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_user_transaction_products` AS SELECT 
 1 AS `id`,
 1 AS `transaction_id`,
 1 AS `product_id`,
 1 AS `transaction_token`,
 1 AS `qty`,
 1 AS `sub_total_price`,
 1 AS `status`,
 1 AS `product_name`,
 1 AS `description`,
 1 AS `product_status`,
 1 AS `cover_label`,
 1 AS `cover_url`,
 1 AS `buyer_id`,
 1 AS `merchant_id`,
 1 AS `created_at`,
 1 AS `updated_at`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `v_cart_active`
--

/*!50001 DROP VIEW IF EXISTS `v_cart_active`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_cart_active` AS select `uuc`.`id` AS `id`,`uuc`.`id_m_users` AS `buyer_id`,`uuc`.`id_merchant` AS `merchant_id`,`uuc`.`id_m_products` AS `product_id`,`uuc`.`qty` AS `qty`,`uuc`.`status` AS `status`,`mp`.`product_name` AS `product_name`,`mp`.`description` AS `description`,`mm`.`label` AS `cover_label`,`mm`.`uri` AS `cover_url`,`up`.`price_default` AS `normal_price`,`up`.`price_selling` AS `selling_price`,`up`.`discount` AS `discount`,`up`.`qty` AS `available_qty`,`uuc`.`created_at` AS `created_at`,`uuc`.`updated_at` AS `updated_at` from (((`u_user_cart` `uuc` left join `m_products` `mp` on((`mp`.`id` = `uuc`.`id_m_products`))) left join `m_medias` `mm` on((`mm`.`id` = `mp`.`id_cover`))) left join `u_product` `up` on((`up`.`id_m_products` = `uuc`.`id_m_products`))) where (`uuc`.`status` = 0) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_merchant`
--

/*!50001 DROP VIEW IF EXISTS `v_merchant`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_merchant` AS select `uu`.`id_m_users` AS `merchant_id`,`mu`.`full_name` AS `full_name`,`mu`.`phone_number` AS `phone_number`,`uuim`.`id` AS `market_id`,`uuim`.`market_name` AS `market_name`,`uuim`.`market_address` AS `market_address`,`uuim`.`market_lat` AS `market_lat`,`uuim`.`market_lon` AS `market_long`,`uuim`.`market_close_time` AS `market_close_time`,`mmp`.`id` AS `photo_id`,`mmp`.`label` AS `photo_label`,`mmp`.`uri` AS `photo_url`,`mmi`.`id` AS `identity_id`,`mmi`.`label` AS `identity_label`,`mmi`.`uri` AS `identity_url`,`uuim`.`is_visible` AS `status`,`uuim`.`created_at` AS `created_at`,`uuim`.`updated_at` AS `updated_at` from ((((`u_user_is_merchant` `uuim` left join `u_user` `uu` on((`uu`.`id` = `uuim`.`id_u_user`))) left join `m_users` `mu` on((`mu`.`id` = `uu`.`id_m_users`))) left join `m_medias` `mmp` on((`mmp`.`id` = `uuim`.`id_market_photo`))) left join `m_medias` `mmi` on((`mmi`.`id` = `uuim`.`id_identity_photo`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_products`
--

/*!50001 DROP VIEW IF EXISTS `v_products`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_products` AS select `mp`.`id` AS `id`,`up`.`id` AS `product_util_id`,`mp`.`product_name` AS `product_name`,`mp`.`description` AS `description`,`mp`.`is_visible` AS `status`,`up`.`price_default` AS `normal_price`,`up`.`price_selling` AS `selling_price`,`up`.`qty` AS `qty`,`up`.`discount` AS `discount`,`mm`.`label` AS `cover_label`,`mm`.`uri` AS `cover_url`,`uu`.`id_m_users` AS `merchant_id`,`uuim`.`id` AS `market_id`,`uuim`.`market_name` AS `market_name`,`uuim`.`market_address` AS `market_address`,`uuim`.`market_close_time` AS `market_close_time`,`uuim`.`is_visible` AS `market_status`,`mm_market`.`label` AS `photo_label`,`mm_market`.`uri` AS `photo_url`,`mp`.`created_at` AS `created_at`,`mp`.`updated_at` AS `updated_at` from ((((((`m_products` `mp` left join `u_product` `up` on((`up`.`id_m_products` = `mp`.`id`))) left join `m_medias` `mm` on((`mm`.`id` = `mp`.`id_cover`))) left join `u_user` `uu` on((`uu`.`id_m_users` = `mp`.`id_m_users`))) left join `u_user_is_merchant` `uuim` on((`uuim`.`id_u_user` = `uu`.`id`))) left join `m_medias` `mm_identity` on((`mm_identity`.`id` = `uuim`.`id_identity_photo`))) left join `m_medias` `mm_market` on((`mm_market`.`id` = `uuim`.`id_market_photo`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_user_transaction`
--

/*!50001 DROP VIEW IF EXISTS `v_user_transaction`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_user_transaction` AS select `uut`.`id` AS `id`,`uut`.`id_m_users` AS `buyer_id`,`uut`.`transaction_token` AS `transaction_token`,`uut`.`total_price` AS `total_price`,`uut`.`status` AS `status`,`mu`.`full_name` AS `full_name`,`mu`.`phone_number` AS `phone_number`,`mu`.`address` AS `address`,`mm`.`label` AS `profile_label`,`mm`.`uri` AS `profile_url`,`uut`.`id_merchant` AS `merchant_id`,`uuim`.`id` AS `market_id`,`uuim`.`market_name` AS `market_name`,`mm_market`.`label` AS `photo_label`,`mm_market`.`uri` AS `photo_url`,`uut`.`created_at` AS `created_at`,`uut`.`updated_at` AS `updated_at` from (((((`u_user_transaction` `uut` left join `u_user` `uu` on((`uu`.`id_m_users` = `uut`.`id_merchant`))) left join `m_users` `mu` on((`mu`.`id` = `uut`.`id_m_users`))) left join `m_medias` `mm` on((`mm`.`id` = `mu`.`id_photo`))) left join `u_user_is_merchant` `uuim` on((`uuim`.`id_u_user` = `uu`.`id`))) left join `m_medias` `mm_market` on((`mm_market`.`id` = `uuim`.`id_market_photo`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_user_transaction_products`
--

/*!50001 DROP VIEW IF EXISTS `v_user_transaction_products`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_user_transaction_products` AS select `uutp`.`id` AS `id`,`uutp`.`id_u_user_transaction` AS `transaction_id`,`uutp`.`id_m_products` AS `product_id`,`uutp`.`transaction_token` AS `transaction_token`,`uutp`.`qty` AS `qty`,`uutp`.`sub_total_price` AS `sub_total_price`,`uutp`.`status` AS `status`,`mp`.`product_name` AS `product_name`,`mp`.`description` AS `description`,`mp`.`is_visible` AS `product_status`,`mm`.`label` AS `cover_label`,`mm`.`uri` AS `cover_url`,`uut`.`id_m_users` AS `buyer_id`,`uut`.`id_merchant` AS `merchant_id`,`uutp`.`created_at` AS `created_at`,`uutp`.`updated_at` AS `updated_at` from (((`u_user_transaction_products` `uutp` left join `m_products` `mp` on((`mp`.`id` = `uutp`.`id_m_products`))) left join `m_medias` `mm` on((`mm`.`id` = `mp`.`id_cover`))) left join `u_user_transaction` `uut` on((`uut`.`id` = `uutp`.`id_u_user_transaction`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-15 22:20:06
