-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2018 at 04:06 PM
-- Server version: 10.1.33-MariaDB
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `at`
--

-- --------------------------------------------------------

--
-- Table structure for table `calendar`
--

CREATE TABLE `calendar` (
  `calID` int(11) NOT NULL,
  `custName` varchar(45) NOT NULL,
  `setDate` varchar(45) NOT NULL,
  `time` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `calendar`
--

INSERT INTO `calendar` (`calID`, `custName`, `setDate`, `time`) VALUES
(1, 'Zane', 'Sat Nov 10 2018', '14:03'),
(2, 'Test', 'Sun Nov 04 2018', '14:01');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `categoryID` int(11) NOT NULL,
  `type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryID`, `type`) VALUES
(1, 'quote'),
(2, 'maintanence'),
(3, 'call out'),
(4, 'installation');

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `chatID` int(11) NOT NULL,
  `clientID` int(11) NOT NULL,
  `slur` varchar(37) NOT NULL,
  `catName` varchar(45) NOT NULL,
  `sent` varchar(45) NOT NULL,
  `date_set` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`chatID`, `clientID`, `slur`, `catName`, `sent`, `date_set`) VALUES
(22, 1, 'gdfsgbfsdgsdf    ', 'quote', 'john', '2018-10-31 14:23:38'),
(23, 1, '    hello', 'call out', 'john', '2018-11-02 07:27:36'),
(27, 16, '            gdsgsed', 'call out', 'Zane Smith', '2018-11-02 09:23:03'),
(28, 16, '            gdsgsed', 'call out', 'Zane Smith', '2018-11-02 09:23:07'),
(29, 16, '            gdsgsedfsf fdfs', 'call out', 'Zane Smith', '2018-11-02 09:23:10'),
(30, 16, '    testing\n', 'installation', 'Zane Smith', '2018-11-02 11:53:39'),
(31, 18, 'third test', 'quote', 'Ben Bobson', '2018-11-02 13:26:29'),
(32, 18, '    hello', 'call out', 'Ben Bobson', '2018-11-02 13:28:54'),
(33, 18, '    hello back', 'call out', 'Ben Bobson', '2018-11-02 13:35:36');

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `clientID` int(11) NOT NULL,
  `client_name` varchar(20) NOT NULL,
  `surname` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`clientID`, `client_name`, `surname`, `email`, `address`, `password`) VALUES
(1, 'John', 'dasfd', 'ben@gmail.com', '060 236 5632', 'w'),
(12, 'm', 'm', 'm', 'm', 'm'),
(13, 'a', 'aa', 'a', 'a', 'a'),
(14, 'z', 'z', 'z', 'z', 'z'),
(15, 'Dayne', 'q', 'q', 'q', 'q'),
(16, 'Zane', 'Smith', 'zane.smith1@yahoo.com', '060 525 8773', 'Pass123#'),
(17, 'Jack', 'Johnson', 'Jack@butt.com', '0602534532', 'Jack123%'),
(18, 'Ben', 'Bobson', 'ben@gmail.com', '060 236 5632', 'Pass123#');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `email`, `password`) VALUES
(1, 'zane.smith1@yahoo.com', '1234'),
(2, 'zane.smith1@yahoo.com', '1234'),
(3, 'w', 'w');

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `managerID` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `contact_number` int(10) NOT NULL,
  `address` varchar(60) NOT NULL,
  `sec_question` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `manager`
--

INSERT INTO `manager` (`managerID`, `user_name`, `email`, `password`, `contact_number`, `address`, `sec_question`) VALUES
(1, 'q', 'q', 'q', 1054, 'q', 'q');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `messageID` int(11) NOT NULL,
  `message` text NOT NULL,
  `chatId` int(11) NOT NULL,
  `sender` tinyint(1) NOT NULL,
  `msg_date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`messageID`, `message`, `chatId`, `sender`, `msg_date_time`) VALUES
(26, 'client message', 22, 1, '2018-10-31 14:23:38'),
(27, 'client message', 23, 1, '2018-10-31 14:23:43'),
(28, 'manager message', 23, 0, '2018-10-31 15:11:16'),
(30, '    fdszfgdszgb fgdsbhnbsfgd', 23, 0, '2018-10-31 15:25:08'),
(31, '    test', 23, 0, '2018-10-31 15:34:23'),
(32, '    test fdsbghhs ', 23, 0, '2018-10-31 15:34:30'),
(33, '    fadfs', 23, 0, '2018-10-31 15:40:58'),
(34, '    fadfsfdasfadsf', 23, 0, '2018-10-31 15:41:02'),
(35, '    fadfsfdasfadsf', 23, 0, '2018-10-31 15:41:03'),
(36, '    fadfsfdasfadsf', 23, 0, '2018-10-31 15:41:04'),
(37, '    fadfsfdasfadsf', 23, 0, '2018-10-31 15:41:04'),
(38, '    fadfsfdasfadsf', 23, 0, '2018-10-31 15:41:04'),
(39, '    fadfsfdasfadsf', 23, 0, '2018-10-31 15:41:04'),
(40, 'gfsaergrwe grewg ', 23, 0, '2018-10-31 16:01:25'),
(41, 'gfsaergrwe grewg  hgbrfehert gtebhtre', 23, 0, '2018-10-31 16:03:02'),
(43, '    client response\n', 23, 1, '2018-10-31 17:50:16'),
(44, '    test', 23, 0, '2018-10-31 17:51:02'),
(45, '            ', 0, 0, '2018-10-31 18:36:49'),
(46, '    dsadsa', 23, 1, '2018-10-31 18:39:51'),
(47, '    cdsvgadfv', 23, 0, '2018-10-31 18:51:11'),
(48, '            ', 0, 0, '2018-10-31 19:11:14'),
(49, '            cdszxvdzfv fdbsfdb bfdsb', 0, 0, '2018-10-31 19:11:23'),
(50, '    gfdshgfd ', 23, 1, '2018-10-31 19:22:41'),
(51, '    gfdshgfd ', 23, 1, '2018-10-31 19:22:44'),
(52, '    gdfsgdsfb ', 23, 1, '2018-10-31 19:25:09'),
(53, '    vfdsavfsda', 23, 1, '2018-10-31 19:25:31'),
(54, '    fsdafasd', 23, 1, '2018-10-31 19:27:06'),
(55, 'test', 23, 1, '2018-10-31 19:34:04'),
(56, 'test', 23, 1, '2018-10-31 19:34:25'),
(57, 'test', 23, 1, '2018-10-31 19:34:53'),
(58, 'test 2', 23, 1, '2018-10-31 19:35:18'),
(59, '    test 3', 23, 0, '2018-10-31 19:37:16'),
(60, '    test 3\n', 23, 0, '2018-10-31 19:38:03'),
(61, '    test 3\n', 23, 0, '2018-10-31 19:38:19'),
(62, '    test 3', 23, 0, '2018-10-31 19:44:38'),
(63, '    fsdf', 23, 0, '2018-11-02 07:21:37'),
(64, '    hello', 23, 1, '2018-11-02 07:27:36'),
(74, '            gfdsgsfd gfds  ', 30, 0, '2018-11-02 11:45:17'),
(75, '    gfdsg dgbfdsg dfg dse', 30, 1, '2018-11-02 11:46:51'),
(76, 'hello', 30, 1, '2018-11-02 11:46:56'),
(77, '    testing\n', 30, 0, '2018-11-02 11:53:39'),
(78, 'initial message', 31, 0, '2018-11-02 13:21:11'),
(79, '    ', 31, 1, '2018-11-02 13:24:12'),
(80, ' ', 31, 1, '2018-11-02 13:24:16'),
(81, '    second message', 31, 1, '2018-11-02 13:26:09'),
(82, 'test', 31, 1, '2018-11-02 13:26:16'),
(83, 'third test', 31, 1, '2018-11-02 13:26:29'),
(84, 'test 2', 32, 0, '2018-11-02 13:28:44'),
(85, '    hello', 32, 1, '2018-11-02 13:28:54'),
(86, 'test 3', 33, 1, '2018-11-02 13:29:26'),
(87, '    hello', 33, 1, '2018-11-02 13:29:35'),
(88, '    hello back', 33, 0, '2018-11-02 13:35:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `calendar`
--
ALTER TABLE `calendar`
  ADD PRIMARY KEY (`calID`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryID`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`chatID`) USING BTREE;

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`clientID`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`managerID`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`messageID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `calendar`
--
ALTER TABLE `calendar`
  MODIFY `calID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `categoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `chatID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `clientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `manager`
--
ALTER TABLE `manager`
  MODIFY `managerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `messageID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
