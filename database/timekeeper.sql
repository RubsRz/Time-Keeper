-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-08-2023 a las 01:39:11
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

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
  `iduser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `employees`
--

INSERT INTO `employees` (`idemployee`, `name`, `lastname`, `idboss`, `iduser`) VALUES
(1, 'Oscar', 'Prieto', 1, 2),
(2, 'Montserrat', 'Hernández', 1, 3),
(3, 'Ruben', 'Rodriguez', 1, 4);

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
(1, '01:00:00', '09:00:00'),
(2, '09:00:00', '16:30:00'),
(4, '21:00:00', '17:00:00'),
(5, '03:00:00', '11:00:00'),
(6, '07:00:00', '15:00:00'),
(7, '21:00:00', '05:00:00'),
(8, '13:00:00', '22:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sched_emp`
--

CREATE TABLE `sched_emp` (
  `idsched_emp` int(11) NOT NULL,
  `idschedule` int(11) DEFAULT NULL,
  `id_employee` int(11) DEFAULT NULL,
  `startdate` date DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `restday` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sched_emp`
--

INSERT INTO `sched_emp` (`idsched_emp`, `idschedule`, `id_employee`, `startdate`, `enddate`, `restday`) VALUES
(1, 1, 1, '2023-07-01', '2023-07-07', '[\"Martes\", \"Jueves\"]'),
(2, 2, 2, '2023-07-10', '2023-07-16', '[\"Jueves\", \"Viernes\"]'),
(11, 6, 2, '2023-08-06', '2023-08-12', '[\"Miércoles\",\"Viernes\"]');

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
(1, 'alvaroh@gmail.com', '$2a$12$Ex2qeGtSi9HNXN4Vv9yoO.28XmAeT5nJ1C63v/1yJ3yFkraA7Q7/.', 1, 'jnbi5v'),
(2, 'oscarp@gmail.com', '$2a$12$AYNffF6OKhNLZp2aMLcZTOkqgST7tlnhim5el7bZWXqTyHOeYp5Xm', 0, NULL),
(3, 'montseh@gmail.com', '$2a$12$HUcvDVMmyK79ZOwtVkF92.ie.xOB2NcGeic/WxnUrimFVGu5Dl/da', 0, NULL),
(4, 'rubenr@gmail.com', '$2a$12$ziKxOrLLWLwW7.0km8mfNe8knAStop9YhQDh1wXtB6nQPiauFrG1O', 0, NULL);

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
  ADD KEY `id_employee` (`id_employee`);
---
--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`iduser`);

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
  MODIFY `idemployee` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `schedules`
--
ALTER TABLE `schedules`
  MODIFY `idschedule` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `sched_emp`
--
ALTER TABLE `sched_emp`
  MODIFY `idsched_emp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `iduser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  ADD CONSTRAINT `sched_emp_ibfk_2` FOREIGN KEY (`id_employee`) REFERENCES `employees` (`idemployee`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
