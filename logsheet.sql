DROP DATABASE IF EXISTS LOGSHEET;
CREATE DATABASE LOGSHEET;
USE LOGSHEET;

DROP TABLE IF EXISTS Staff;
CREATE TABLE Staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role ENUM('Coordinator', 'Lecturer', 'Technical Staff') NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS Course;
CREATE TABLE Course (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS Module;
CREATE TABLE Module (
    module_id INT AUTO_INCREMENT PRIMARY KEY,
    module_name VARCHAR(100) NOT NULL,
    curriculum_file_path VARCHAR(255),
    course_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Schedule;
CREATE TABLE Schedule (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    module_id INT NOT NULL,
    staff_id INT NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    type ENUM('Lecture', 'Lab') NOT NULL,
    `group` VARCHAR(100),
    venue VARCHAR(100),
    FOREIGN KEY (course_id) REFERENCES Course(course_id),
    FOREIGN KEY (module_id) REFERENCES Module(module_id),
    FOREIGN KEY (staff_id) REFERENCES Staff(staff_id)
);

DROP TABLE IF EXISTS Logsheet;
CREATE TABLE Logsheet (
    logsheet_id INT AUTO_INCREMENT PRIMARY KEY,
    schedule_id INT NOT NULL,
    staff_id INT NOT NULL,
    course_id INT NOT NULL,
    module_id INT NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    type ENUM('Lecture', 'Lab') NOT NULL,
    topics_taught TEXT,
    assignment_given TEXT,
    student_progress TEXT,
    FOREIGN KEY (schedule_id) REFERENCES Schedule(schedule_id),
    FOREIGN KEY (staff_id) REFERENCES Staff(staff_id),
    FOREIGN KEY (course_id) REFERENCES Course(course_id),
    FOREIGN KEY (module_id) REFERENCES Module(module_id)
);

