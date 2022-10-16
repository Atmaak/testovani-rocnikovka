-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Ned 16. říj 2022, 16:38
-- Verze serveru: 10.4.24-MariaDB
-- Verze PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `rocnikovka`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `answers`
--

CREATE TABLE `answers` (
  `id_answer` int(11) NOT NULL,
  `id_question` int(11) NOT NULL,
  `text` varchar(256) COLLATE utf8mb4_czech_ci NOT NULL,
  `correct` varchar(32) COLLATE utf8mb4_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `answers`
--

INSERT INTO `answers` (`id_answer`, `id_question`, `text`, `correct`) VALUES
(72, 9, 'ads', 'false'),
(73, 9, 'dsa', 'false'),
(74, 9, 'sda', 'true'),
(75, 9, 'asd', 'false'),
(76, 10, 'ads', 'false'),
(77, 10, 'dsa', 'false'),
(78, 10, 'sda', 'true'),
(79, 10, 'asd', 'false'),
(80, 11, 'das', 'false'),
(81, 11, 'dasads', 'true'),
(82, 12, 'das', 'false'),
(83, 12, 'asdasdadsads', 'false'),
(84, 12, 'asdads', 'false'),
(85, 12, 'asdasdasd', 'true'),
(86, 13, 'sdaasd', 'false'),
(87, 13, 'asddasasd', 'false'),
(88, 13, 'asdasd', 'true'),
(89, 13, 'asdasdasd', 'false'),
(90, 14, 'dsadas', 'false'),
(91, 14, 'asddas', 'true'),
(92, 14, 'dasdas', 'false'),
(93, 14, 'adsasd', 'false'),
(94, 15, 'dasdas', 'true'),
(95, 15, 'dasasd', 'false'),
(96, 15, 'adsasd', 'false'),
(97, 15, 'adsasdas', 'false'),
(98, 16, '1', 'false'),
(99, 16, '2', 'false'),
(100, 16, '3', 'true'),
(101, 16, '4', 'false'),
(102, 17, '5', 'false'),
(103, 17, '6', 'false'),
(104, 17, '7', 'false'),
(105, 17, '8', 'true'),
(106, 18, 'dassssssssssssssssssssssssdassssssssssssssssssssssssdassssssssssssssssssssssssdassssssssssssssssssssssssdassssssssssssssssssssssssdassssssssssssssssssssssssdassssssssssssssssssssssss', 'false'),
(107, 18, 'dassssssssssssssssssssssssdassssssssssssssssssssssssdassssssssssssssssssssssssdassssssssssssssssssssssss', 'false'),
(108, 18, 'dassssssssssssssssssssssssdassssssssssssssssssssssssdassssssssssssssssssssssss', 'false'),
(109, 18, 'dassssssssssssssssssssssssdassssssssssssssssssssssssdassssssssssssssssssssssss', 'true'),
(110, 19, 'das', 'false'),
(111, 19, 'das', 'true');

-- --------------------------------------------------------

--
-- Zástupná struktura pro pohled `answers_to_test`
-- (Vlastní pohled viz níže)
--
CREATE TABLE `answers_to_test` (
`id_test` int(11)
,`id_question` int(11)
,`question_text` varchar(256)
,`id_answer` int(11)
,`answer_text` varchar(256)
,`correct` varchar(32)
);

-- --------------------------------------------------------

--
-- Struktura tabulky `questions`
--

CREATE TABLE `questions` (
  `id_question` int(11) NOT NULL,
  `id_test` int(11) NOT NULL,
  `text` varchar(256) COLLATE utf8mb4_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `questions`
--

INSERT INTO `questions` (`id_question`, `id_test`, `text`) VALUES
(9, 51, '0'),
(10, 52, 'das'),
(11, 53, 'dasdada'),
(12, 53, 'adsdas'),
(13, 53, 'dassda'),
(14, 53, 'dsasda'),
(15, 53, 'dasads'),
(16, 54, 'otazka 1'),
(17, 54, 'otazka 2'),
(18, 55, 'das'),
(19, 56, 'Rozšíření zlomku frac64  4 6 ​   číslem 55: frac64 = frac{6cdot 5}{4cdot 5} = frac{30}{20}  4 6 ​  =  4⋅5 6⋅5 ​  =  20 30 ​  .');

-- --------------------------------------------------------

--
-- Struktura tabulky `tests`
--

CREATE TABLE `tests` (
  `id_test` int(11) NOT NULL,
  `name` varchar(64) COLLATE utf8mb4_czech_ci NOT NULL,
  `invite_code` varchar(16) COLLATE utf8mb4_czech_ci NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_grading` int(11) NOT NULL,
  `quantity_of_questions` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `tests`
--

INSERT INTO `tests` (`id_test`, `name`, `invite_code`, `id_user`, `id_grading`, `quantity_of_questions`) VALUES
(51, 'das', '9zj6OLpSoRnuhOLW', 1, 1, 1),
(52, 'das', 'vS8fiuCr5DdT7HsR', 1, 1, 1),
(53, 'magotr', 'hkwmjx436sdwJhuy', 1, 1, 5),
(54, 'edna', 'eDmRfqq0YqCzeFye', 1, 1, 2),
(55, 'dasd', 'AiKtQBsFLDJeeGpt', 1, 1, 1),
(56, 'Test testu', 'CcWykHs2bgxiy6Q4', 1, 1, 1);

-- --------------------------------------------------------

--
-- Struktura tabulky `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `name` varchar(256) COLLATE utf8mb4_czech_ci NOT NULL,
  `email` varchar(256) COLLATE utf8mb4_czech_ci NOT NULL,
  `password` varchar(256) COLLATE utf8mb4_czech_ci NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp(),
  `isDeleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `users`
--

INSERT INTO `users` (`id_user`, `admin`, `name`, `email`, `password`, `timestamp`, `isDeleted`) VALUES
(1, 1, 'admin', 'admin@admin', 'sha1$5126d643$1$14b5808f10f65559e718ea5d3d6ba700a8ed45b4', '2022-10-07 23:15:01', 0);

-- --------------------------------------------------------

--
-- Struktura pro pohled `answers_to_test`
--
DROP TABLE IF EXISTS `answers_to_test`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `answers_to_test`  AS SELECT `questions`.`id_test` AS `id_test`, `questions`.`id_question` AS `id_question`, `questions`.`text` AS `question_text`, `answers`.`id_answer` AS `id_answer`, `answers`.`text` AS `answer_text`, `answers`.`correct` AS `correct` FROM (`questions` join `answers` on(`questions`.`id_question` = `answers`.`id_question`))  ;

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id_answer`);

--
-- Indexy pro tabulku `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id_question`);

--
-- Indexy pro tabulku `tests`
--
ALTER TABLE `tests`
  ADD PRIMARY KEY (`id_test`);

--
-- Indexy pro tabulku `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `answers`
--
ALTER TABLE `answers`
  MODIFY `id_answer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT pro tabulku `questions`
--
ALTER TABLE `questions`
  MODIFY `id_question` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pro tabulku `tests`
--
ALTER TABLE `tests`
  MODIFY `id_test` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT pro tabulku `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
