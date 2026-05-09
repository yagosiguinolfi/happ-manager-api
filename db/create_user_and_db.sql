-- db/create_user_and_db.sql
-- Script to create database and grant privileges to happ_user

-- Run as root (inside MySQL):
-- mysql -u root -p < db/create_user_and_db.sql

CREATE DATABASE IF NOT EXISTS `happ_manager_api` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user if not exists and set password
CREATE USER IF NOT EXISTS 'happ_user'@'%' IDENTIFIED BY '1232';
CREATE USER IF NOT EXISTS 'happ_user'@'localhost' IDENTIFIED BY '1232';

-- Grant privileges
GRANT ALL PRIVILEGES ON `happ_manager_api`.* TO 'happ_user'@'%';
GRANT ALL PRIVILEGES ON `happ_manager_api`.* TO 'happ_user'@'localhost';

FLUSH PRIVILEGES;

-- Optional: verify
-- SELECT user, host FROM mysql.user WHERE user = 'happ_user';
-- SHOW GRANTS FOR 'happ_user'@'localhost';
