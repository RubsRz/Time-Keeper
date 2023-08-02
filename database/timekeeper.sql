-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-08-2023 a las 02:16:57
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `timekeeper`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bosses`
--

CREATE TABLE `bosses` (
  `idboss` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `iddepartment` int(11) DEFAULT NULL,
  `iduser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bosses`
--

INSERT INTO `bosses` (`idboss`, `name`, `lastname`, `iddepartment`, `iduser`) VALUES
(1, 'Álvaro', 'Herrera', 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departments`
--

CREATE TABLE `departments` (
  `iddepartment` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `creation_date` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `departments`
--

INSERT INTO `departments` (`iddepartment`, `name`, `description`, `creation_date`) VALUES
(1, 'Sales', 'Department responsible for sales', '2022-01-15'),
(2, 'Human Resources', 'Department responsible for personnel management', '2021-09-10'),
(3, 'Development', 'Department responsible for software development', '2023-02-28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employees`
--

CREATE TABLE `employees` (
  `idemployee` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `idboss` int(11) DEFAULT NULL,
  `iduser` int(11) DEFAULT NULL,
  `vacations` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `employees`
--

INSERT INTO `employees` (`idemployee`, `name`, `lastname`, `idboss`, `iduser`, `vacations`) VALUES
(1, 'Oscar', 'Prieto', 1, 2, 25),
(2, 'Montserrat', 'Hernández', 1, 3, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `schedules`
--

CREATE TABLE `schedules` (
  `idschedule` int(11) NOT NULL,
  `starttime` time NOT NULL,
  `endtime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `schedules`
--

INSERT INTO `schedules` (`idschedule`, `starttime`, `endtime`) VALUES
(1, '09:00:00', '17:00:00'),
(2, '08:30:00', '16:30:00'),
(4, '22:41:00', '20:47:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sched_emp`
--

CREATE TABLE `sched_emp` (
  `idsched_emp` int(11) NOT NULL,
  `idschedule` int(11) DEFAULT NULL,
  `idemployee` int(11) DEFAULT NULL,
  `startdate` date DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `rest` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sched_emp`
--

INSERT INTO `sched_emp` (`idsched_emp`, `idschedule`, `idemployee`, `startdate`, `enddate`, `rest`) VALUES
(1, 1, 1, '2023-07-24', '2023-07-28', ''),
(2, 2, 2, NULL, NULL, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `iduser` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_boss` tinyint(1) DEFAULT NULL,
  `reset_code` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`iduser`, `email`, `password`, `is_boss`, `reset_code`) VALUES
(1, 'alvaroh@gmail.com', '$2a$12$Ex2qeGtSi9HNXN4Vv9yoO.28XmAeT5nJ1C63v/1yJ3yFkraA7Q7/.', 1, '599qzn'),
(2, 'oscarp@gmail.com', '$2a$12$AYNffF6OKhNLZp2aMLcZTOkqgST7tlnhim5el7bZWXqTyHOeYp5Xm', 0, '8licrq'),
(3, 'montseh@gmail.com', '$2b$10$u7aj09vVOjKQYYziql/rpuwNHjZIL3poBF9/c3fqaXNfAvnf3HXce', 0, 'lpj8jd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacations`
--

CREATE TABLE `vacations` (
  `idvacation` int(11) NOT NULL,
  `idemployee` int(11) DEFAULT NULL,
  `idboss` int(11) DEFAULT NULL,
  `startdate` date DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vacations`
--

INSERT INTO `vacations` (`idvacation`, `idemployee`, `idboss`, `startdate`, `enddate`, `status`) VALUES
(1, 1, 1, '2023-08-16', '2023-08-30', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bosses`
--
ALTER TABLE `bosses`
  ADD PRIMARY KEY (`idboss`),
  ADD KEY `iddepartment` (`iddepartment`),
  ADD KEY `iduser` (`iduser`);

--
-- Indices de la tabla `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`iddepartment`);

--
-- Indices de la tabla `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`idemployee`),
  ADD KEY `idboss` (`idboss`),
  ADD KEY `iduser` (`iduser`);

--
-- Indices de la tabla `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`idschedule`);

--
-- Indices de la tabla `sched_emp`
--
ALTER TABLE `sched_emp`
  ADD PRIMARY KEY (`idsched_emp`),
  ADD KEY `idschedule` (`idschedule`),
  ADD KEY `id_employee` (`idemployee`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`iduser`);

--
-- Indices de la tabla `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`idvacation`),
  ADD KEY `idemployee` (`idemployee`),
  ADD KEY `idboss` (`idboss`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bosses`
--
ALTER TABLE `bosses`
  MODIFY `idboss` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `departments`
--
ALTER TABLE `departments`
  MODIFY `iddepartment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `employees`
--
ALTER TABLE `employees`
  MODIFY `idemployee` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `schedules`
--
ALTER TABLE `schedules`
  MODIFY `idschedule` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `sched_emp`
--
ALTER TABLE `sched_emp`
  MODIFY `idsched_emp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `iduser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `vacations`
--
ALTER TABLE `vacations`
  MODIFY `idvacation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bosses`
--
ALTER TABLE `bosses`
  ADD CONSTRAINT `bosses_ibfk_1` FOREIGN KEY (`iddepartment`) REFERENCES `departments` (`iddepartment`),
  ADD CONSTRAINT `bosses_ibfk_2` FOREIGN KEY (`iduser`) REFERENCES `users` (`iduser`);

--
-- Filtros para la tabla `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`idboss`) REFERENCES `bosses` (`idboss`),
  ADD CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`iduser`) REFERENCES `users` (`iduser`);

--
-- Filtros para la tabla `sched_emp`
--
ALTER TABLE `sched_emp`
  ADD CONSTRAINT `sched_emp_ibfk_1` FOREIGN KEY (`idschedule`) REFERENCES `schedules` (`idschedule`),
  ADD CONSTRAINT `sched_emp_ibfk_2` FOREIGN KEY (`idemployee`) REFERENCES `employees` (`idemployee`);

--
-- Filtros para la tabla `vacations`
--
ALTER TABLE `vacations`
  ADD CONSTRAINT `vacations_ibfk_1` FOREIGN KEY (`idemployee`) REFERENCES `employees` (`idemployee`),
  ADD CONSTRAINT `vacations_ibfk_2` FOREIGN KEY (`idboss`) REFERENCES `bosses` (`idboss`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
