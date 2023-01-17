-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Úte 17. led 2023, 16:25
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
(21, 7, 'Odpověď', 'true'),
(22, 7, 'Špatná Odpověď', 'false'),
(23, 7, 'Špatná Odpověď', 'false'),
(24, 7, 'Špatná Odpověď', 'false'),
(25, 8, 'Špatná Odpověď', 'false'),
(26, 8, 'Odpověď', 'true'),
(27, 8, 'Špatná Odpověď', 'false'),
(28, 9, 'Špatná Odpověď', 'false'),
(29, 9, 'Špatná Odpověď', 'false'),
(30, 9, 'Špatná Odpověď', 'false'),
(31, 9, 'Odpověď', 'true'),
(32, 10, 'Špatná Odpověď', 'false'),
(33, 10, 'Odpověď', 'true'),
(34, 11, 'Špatná Odpověď', 'false'),
(35, 11, 'Odpověď', 'true');

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
-- Struktura tabulky `grades`
--

CREATE TABLE `grades` (
  `id_grade` int(11) NOT NULL,
  `id_grading` int(11) NOT NULL,
  `grade` int(11) NOT NULL,
  `percentage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `grades`
--

INSERT INTO `grades` (`id_grade`, `id_grading`, `grade`, `percentage`) VALUES
(1, 1, 1, 80),
(2, 1, 2, 60),
(3, 1, 3, 40),
(4, 1, 4, 20),
(5, 1, 5, 0);

-- --------------------------------------------------------

--
-- Struktura tabulky `grading`
--

CREATE TABLE `grading` (
  `id_grading` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `grading`
--

INSERT INTO `grading` (`id_grading`, `id_user`, `timestamp`) VALUES
(1, 1, '2022-11-12 18:28:50');

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
(7, 4, 'Otázka'),
(8, 4, 'Otázka'),
(9, 4, 'Otázka'),
(10, 4, 'Otázka'),
(11, 4, 'Otázka');

-- --------------------------------------------------------

--
-- Struktura tabulky `students_grades`
--

CREATE TABLE `students_grades` (
  `id_student_grade` int(11) NOT NULL,
  `id_test` int(11) NOT NULL,
  `email` varchar(256) COLLATE utf8mb4_czech_ci NOT NULL,
  `grade` int(11) NOT NULL,
  `percentage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `students_grades`
--

INSERT INTO `students_grades` (`id_student_grade`, `id_test`, `email`, `grade`, `percentage`) VALUES
(17, 4, 'martin@martin.martin', 3, 40);

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
(4, 'Test 1', 'Ns1wWT0Vpo4yKZcW', 1, 1, 5);

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
(1, 1, 'admin adminov', 'admin@admin', 'sha1$5126d643$1$14b5808f10f65559e718ea5d3d6ba700a8ed45b4', '2022-10-07 23:15:01', 0),
(2, 0, 'na vypnuti', 'vypnout@vypnout', 'sha1$a16687fa$1$693603fbd738d3766aeb86d3e2a7c9ae5caba663', '2023-01-17 16:22:27', 0),
(3, 0, 'vypnout 2', 'vypnout2@vypnout2', 'sha1$a48ea88b$1$8ad79fadd6e22578a355ad92f0306c6d7ef9b2a3', '2023-01-17 16:23:46', 0);

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
-- Indexy pro tabulku `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id_grade`);

--
-- Indexy pro tabulku `grading`
--
ALTER TABLE `grading`
  ADD PRIMARY KEY (`id_grading`);

--
-- Indexy pro tabulku `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id_question`);

--
-- Indexy pro tabulku `students_grades`
--
ALTER TABLE `students_grades`
  ADD PRIMARY KEY (`id_student_grade`);

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
  MODIFY `id_answer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT pro tabulku `grades`
--
ALTER TABLE `grades`
  MODIFY `id_grade` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pro tabulku `grading`
--
ALTER TABLE `grading`
  MODIFY `id_grading` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pro tabulku `questions`
--
ALTER TABLE `questions`
  MODIFY `id_question` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pro tabulku `students_grades`
--
ALTER TABLE `students_grades`
  MODIFY `id_student_grade` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pro tabulku `tests`
--
ALTER TABLE `tests`
  MODIFY `id_test` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pro tabulku `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
