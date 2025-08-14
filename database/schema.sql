-- Drop database if it exists
DROP DATABASE IF EXISTS logsheet_app;

-- Create the database
CREATE DATABASE logsheet_app;

-- Use the newly created database
USE logsheet_app;

-- Drop tables if they already exist (for clean setup)
DROP TABLE IF EXISTS logsheets;
DROP TABLE IF EXISTS schedules;
DROP TABLE IF EXISTS modules;
DROP TABLE IF EXISTS staff;
DROP TABLE IF EXISTS courses;

-- Create 'courses' table
CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(50) NOT NULL
);

-- Create 'staff' table
CREATE TABLE staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role ENUM('Coordinator', 'Staff') NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create 'modules' table
CREATE TABLE modules (
    module_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    module_name VARCHAR(100) NOT NULL,
    curriculum_file_path VARCHAR(255),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create 'schedules' table
CREATE TABLE schedules (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    module_id INT NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    type ENUM('Lecture', 'Lab') NOT NULL,
    `group` VARCHAR(20),
    venue VARCHAR(100),
    faculty_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (module_id) REFERENCES modules(module_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (faculty_id) REFERENCES staff(staff_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create 'logsheets' table
CREATE TABLE logsheets (
    logsheet_id INT AUTO_INCREMENT PRIMARY KEY,
    schedule_id INT,
    date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    course_id INT,
    module_id INT,
    type ENUM('Lecture', 'Lab'),
    status VARCHAR(50),
    topics_taught TEXT,           
    assignment_given TEXT,        
    student_progress TEXT,        
    faculty_id INT NOT NULL,
    FOREIGN KEY (schedule_id) REFERENCES schedules(schedule_id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (module_id) REFERENCES modules(module_id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (faculty_id) REFERENCES staff(staff_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);
