-- Create the database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS PlayPortalDB;

-- Use the database for the following operations
USE PlayPortalDB;

-- Create the users table to store emails and hashed passwords
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
