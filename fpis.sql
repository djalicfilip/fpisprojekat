-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2023 at 08:41 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fpis`
--

-- --------------------------------------------------------

--
-- Table structure for table `dobavljac`
--

CREATE TABLE `dobavljac` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `naziv_dobavljaca` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_dobavljaca` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adresa` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faktura`
--

CREATE TABLE `faktura` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `napomena` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `datum` date NOT NULL,
  `spediter_id` bigint(20) UNSIGNED NOT NULL,
  `dobavljac_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_10_06_131900_create_zaposleni_table', 1),
(6, '2023_10_06_134530_create_dobavljac_table', 1),
(7, '2023_10_06_134544_create_spediter_table', 1),
(8, '2023_10_06_135200_create_faktura_table', 1),
(9, '2023_10_06_136200_create_nalog_za_carinjenje_table', 1),
(10, '2023_11_25_190725_create_profaktura_table', 1),
(11, '2023_11_25_190955_create_proizvod_table', 1),
(12, '2023_11_25_191330_create_stakva_profakture_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `nalog_za_carinjenje`
--

CREATE TABLE `nalog_za_carinjenje` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `datumNaloga` date NOT NULL,
  `sadrzajNaloga` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `zaposleni_id` bigint(20) UNSIGNED NOT NULL,
  `faktura_id` bigint(20) UNSIGNED NOT NULL,
  `spediter_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profaktura`
--

CREATE TABLE `profaktura` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `datum` date NOT NULL,
  `PDV` double NOT NULL,
  `ukupanIznos` double NOT NULL,
  `dobavljac_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `proizvod`
--

CREATE TABLE `proizvod` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `naziv_proizvoda` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nabavna_cena` decimal(8,2) NOT NULL,
  `opis` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `spediter`
--

CREATE TABLE `spediter` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nazivSpeditera` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pib` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailSpeditera` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stakva_profakture`
--

CREATE TABLE `stakva_profakture` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kolicina` int(11) NOT NULL,
  `iznos` decimal(8,2) NOT NULL,
  `proizvod_id` bigint(20) UNSIGNED NOT NULL,
  `profaktura_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zaposleni`
--

CREATE TABLE `zaposleni` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `imeZaposlenog` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prezimeZaposlenog` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `datumRodjenja` date NOT NULL,
  `brTelZaposlenog` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailZaposlenog` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dobavljac`
--
ALTER TABLE `dobavljac`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `faktura`
--
ALTER TABLE `faktura`
  ADD PRIMARY KEY (`id`),
  ADD KEY `faktura_spediter_id_foreign` (`spediter_id`),
  ADD KEY `faktura_dobavljac_id_foreign` (`dobavljac_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nalog_za_carinjenje`
--
ALTER TABLE `nalog_za_carinjenje`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nalog_za_carinjenje_zaposleni_id_foreign` (`zaposleni_id`),
  ADD KEY `nalog_za_carinjenje_faktura_id_foreign` (`faktura_id`),
  ADD KEY `nalog_za_carinjenje_spediter_id_foreign` (`spediter_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `profaktura`
--
ALTER TABLE `profaktura`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profaktura_dobavljac_id_foreign` (`dobavljac_id`);

--
-- Indexes for table `proizvod`
--
ALTER TABLE `proizvod`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `spediter`
--
ALTER TABLE `spediter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `spediter_emailspeditera_unique` (`emailSpeditera`);

--
-- Indexes for table `stakva_profakture`
--
ALTER TABLE `stakva_profakture`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stakva_profakture_proizvod_id_foreign` (`proizvod_id`),
  ADD KEY `stakva_profakture_profaktura_id_foreign` (`profaktura_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `zaposleni`
--
ALTER TABLE `zaposleni`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `zaposleni_brtelzaposlenog_unique` (`brTelZaposlenog`),
  ADD UNIQUE KEY `zaposleni_emailzaposlenog_unique` (`emailZaposlenog`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dobavljac`
--
ALTER TABLE `dobavljac`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faktura`
--
ALTER TABLE `faktura`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `nalog_za_carinjenje`
--
ALTER TABLE `nalog_za_carinjenje`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profaktura`
--
ALTER TABLE `profaktura`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `proizvod`
--
ALTER TABLE `proizvod`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `spediter`
--
ALTER TABLE `spediter`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stakva_profakture`
--
ALTER TABLE `stakva_profakture`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zaposleni`
--
ALTER TABLE `zaposleni`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `faktura`
--
ALTER TABLE `faktura`
  ADD CONSTRAINT `faktura_dobavljac_id_foreign` FOREIGN KEY (`dobavljac_id`) REFERENCES `dobavljac` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `faktura_spediter_id_foreign` FOREIGN KEY (`spediter_id`) REFERENCES `spediter` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `nalog_za_carinjenje`
--
ALTER TABLE `nalog_za_carinjenje`
  ADD CONSTRAINT `nalog_za_carinjenje_faktura_id_foreign` FOREIGN KEY (`faktura_id`) REFERENCES `faktura` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `nalog_za_carinjenje_spediter_id_foreign` FOREIGN KEY (`spediter_id`) REFERENCES `spediter` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `nalog_za_carinjenje_zaposleni_id_foreign` FOREIGN KEY (`zaposleni_id`) REFERENCES `zaposleni` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `profaktura`
--
ALTER TABLE `profaktura`
  ADD CONSTRAINT `profaktura_dobavljac_id_foreign` FOREIGN KEY (`dobavljac_id`) REFERENCES `dobavljac` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `stakva_profakture`
--
ALTER TABLE `stakva_profakture`
  ADD CONSTRAINT `stakva_profakture_profaktura_id_foreign` FOREIGN KEY (`profaktura_id`) REFERENCES `profaktura` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `stakva_profakture_proizvod_id_foreign` FOREIGN KEY (`proizvod_id`) REFERENCES `proizvod` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
