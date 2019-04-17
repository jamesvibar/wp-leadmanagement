-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 17, 2019 at 03:17 AM
-- Server version: 10.3.14-MariaDB-1:10.3.14+maria~trusty
-- PHP Version: 7.2.16-1+ubuntu14.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wordpresstrunk`
--

-- --------------------------------------------------------

--
-- Table structure for table `wp_database_emails`
--

CREATE TABLE `wp_database_emails` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `date_send` timestamp NULL DEFAULT current_timestamp(),
  `source` text NOT NULL,
  `form_type` varchar(50) DEFAULT NULL,
  `form_type_id` int(11) NOT NULL,
  `lead_source` text NOT NULL,
  `has_been_contacted` tinyint(1) NOT NULL DEFAULT 0,
  `profit` int(36) NOT NULL DEFAULT 0,
  `last_edit` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `manual_add` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wp_database_emails`
--

INSERT INTO `wp_database_emails` (`id`, `name`, `email`, `phone`, `message`, `date_send`, `source`, `form_type`, `form_type_id`, `lead_source`, `has_been_contacted`, `profit`, `last_edit`, `is_deleted`, `manual_add`) VALUES
(2593, 'Lorem Ipsum', '12312@gmail.com', '1234567', '55', '2019-04-08 06:05:45', 'https://rosscgoodman.com/contact-ross/', '', 0, '', 0, 0, NULL, 0, 1),
(2594, 'Lorem Dolor', '129831983@gmail.com', '1234567', '123', '2019-04-07 22:10:22', 'https://rosscgoodman.com/contact-ross/', '', 0, 'Facebook', 1, 0, '2019-04-10 05:36:24', 0, 1),
(2595, 'Mike Ganti', 'vibarjamess@gmail.com', '1234567', '1234', '2019-04-07 22:12:23', 'https://rosscgoodman.com/contact-ross/', '', 0, '', 1, 0, '2019-04-10 06:45:45', 0, 1),
(2596, 'Test User', 'infinitepowerrr@gmail.com', '1234567', '3', '2019-04-07 22:18:15', 'https://rosscgoodman.com/contact-ross/', '', 0, 'Facebook', 0, 0, '2019-04-10 06:37:45', 0, 1),
(2597, 'Test User Ediit', 'vibarjamess@gmail.com', '702', '123', '2019-04-07 14:19:43', 'https://rosscgoodman.com/contact-ross/', '', 0, '', 1, 500000, '2019-04-08 10:10:41', 0, 1),
(2598, 'Test User Edit', 'vibarjamess@gmail.com', '702', '123', '2019-04-07 14:20:48', 'https://rosscgoodman.com/contact-ross/', '', 0, 'Hello ', 1, 0, '2019-04-10 06:38:19', 0, 1),
(2599, 'Filtered User Add', 'vibarjamess@gmail.com', '702', '123', '2019-04-08 06:21:37', 'https://rosscgoodman.com/contact-ross/', '', 0, '', 1, 5000000, '2019-04-08 06:22:39', 1, 1),
(2600, 'taskete', 'jrfvibar@gmail.com', '9751127499', 'Lorem ipsum dolor sit amet.', '2019-04-07 17:32:03', 'https://rosscgoodman.com/contact-ross/', '', 0, '', 0, 0, '2019-04-10 06:38:09', 0, 1),
(2601, 'Test User', 'vibarjamess@gmail.com', '702', 'Hello\n\nWorld', '2019-04-08 02:07:45', 'https://rosscgoodman.com/contact-ross/', '', 0, '', 0, 0, '2019-04-10 05:37:20', 0, 1),
(2602, 'Test User', 'vibarjamess@gmail.com', '1234567', '123', '2019-04-10 06:48:34', '', '', 0, '', 0, 0, '2019-04-10 06:48:57', 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `wp_database_emails`
--
ALTER TABLE `wp_database_emails`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `wp_database_emails`
--
ALTER TABLE `wp_database_emails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2603;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
