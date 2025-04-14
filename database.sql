
create database hackathon;
use hackathon;

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(50),
    email VARCHAR(30),
    password VARCHAR(20),
    phone_no VARCHAR(10),
    created_time DATE
);

CREATE TABLE blogs(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(20),
    contents VARCHAR(30),
    created_time DATE,
    user_id INT,
    category_id INT
);

CREATE TABLE categories(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    description VARCHAR(50)
);

