-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2018 at 09:03 PM
-- Server version: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `at_messengerdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `calendar`
--

CREATE TABLE IF NOT EXISTS `calendar` (
`calID` int(11) NOT NULL,
  `date_marked` varchar(30) NOT NULL,
  `time` time NOT NULL,
  `clientID` int(11) DEFAULT NULL,
  `client_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE IF NOT EXISTS `category` (
`categoryID` int(11) NOT NULL,
  `type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE IF NOT EXISTS `client` (
`clientID` int(11) NOT NULL,
  `client_name` varchar(20) NOT NULL,
  `surname` varchar(20) NOT NULL,
  `cell_number` int(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`clientID`, `client_name`, `surname`, `cell_number`, `email`, `address`, `password`) VALUES
(1, 'Sajjaad', 'Ishmail', 844482901, 'sajjaadishmail@gmail.com', '', 'password'),
(11, 'undefined', 'Smith', 861234567, 'zane.smit@gmail.com', '4 Aries rd Kenilworth', 'pass');

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE IF NOT EXISTS `manager` (
`managerID` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `manager`
--

INSERT INTO `manager` (`managerID`, `username`, `password`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE IF NOT EXISTS `message` (
`messageID` int(11) NOT NULL,
  `message` text NOT NULL,
  `msg_date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE IF NOT EXISTS `ticket` (
`ticketID` int(11) NOT NULL,
  `managerID` int(11) NOT NULL,
  `clientID` int(11) NOT NULL,
  `messageID` int(11) NOT NULL,
  `timeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
-- Indexes for table `client`
--
ALTER TABLE `client`
 ADD PRIMARY KEY (`clientID`);

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
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
 ADD PRIMARY KEY (`ticketID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `calendar`
--
ALTER TABLE `calendar`
MODIFY `calID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
MODIFY `categoryID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
MODIFY `clientID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `manager`
--
ALTER TABLE `manager`
MODIFY `managerID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
MODIFY `messageID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
MODIFY `ticketID` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
