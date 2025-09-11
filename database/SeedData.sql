-- ============================
-- Seed Data for logsheet_app
-- ============================

USE logsheet_app;

-- ============================
-- 1. Clear existing data
-- ============================
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE logsheets;
TRUNCATE TABLE schedule_uploads;
TRUNCATE TABLE schedules;
TRUNCATE TABLE modules;
TRUNCATE TABLE courses;
TRUNCATE TABLE staff;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================
-- 2. Insert staff
-- ============================
INSERT INTO staff (staff_id, name, role, username, email, password, phone_number, department, office_location, joined_date)
VALUES
(1, 'yogeeta', 'Staff', 'yogeeta', 'yogeeta@example.com', '$2b$10$sIc7y9Ht7MVhlTwG.CrYqeAJ/MUFnEp6p3x2awYzVgC.QWQLeI.QK', NULL, NULL, NULL, NULL),
(2, 'Yogesh', 'Coordinator', 'Yogesh', 'Yogesh@example.com', '$2b$10$RY1DJZxLEqxO527CUUNNReeFNCobC1i/izplgunGFDGZgK9jMxRzS', '9911254789', 'IT', 'Pune', '2024-01-01'),
(3, 'Mahesh', 'Staff', 'Mahesh', 'Mahesh@example.com', '$2b$10$nj0FuT3TYHR89Ptnq/Q2z.5MJBDbaV2rYlSmL9bnaxx7XI.85yekK', NULL, NULL, NULL, NULL);

-- ============================
-- 3. Insert courses
-- ============================
INSERT INTO courses (course_name, coordinator_id, modules_count, status)
VALUES
('PG DAC MARCH 2024', 2, 5, 'Active'),
('PG DAC JULY 2024', 2, 5, 'Active'),
('PG DMC MARCH 2024', 2, 5, 'Active'),
('PG DESD JULY 2024', 2, 5, 'Active'),
('PG DAI MARCH 2024', 2, 5, 'Active'),
('PG DBDA MARCH 2024', 2, 5, 'Active');

-- ============================
-- 4. Insert modules
-- ============================
INSERT INTO modules (course_id, module_name, curriculum_file_path)
VALUES
(1, 'Module 1 - Advanced Computing', '/files/curriculums/pg_dac_march_2024_module1.pdf'),
(1, 'Module 2 - Operating Systems', '/files/curriculums/pg_dac_march_2024_module2.pdf'),
(1, 'Module 3 - Data Structures', '/files/curriculums/pg_dac_march_2024_module3.pdf'),
(1, 'Module 4 - Algorithms', '/files/curriculums/pg_dac_march_2024_module4.pdf'),
(1, 'Module 5 - Database Management', '/files/curriculums/pg_dac_march_2024_module5.pdf'),
(2, 'Module 1 - Advanced Computing', '/files/curriculums/pg_dac_july_2024_module1.pdf'),
(2, 'Module 2 - Operating Systems', '/files/curriculums/pg_dac_july_2024_module2.pdf'),
(2, 'Module 3 - Data Structures', '/files/curriculums/pg_dac_july_2024_module3.pdf'),
(2, 'Module 4 - Algorithms', '/files/curriculums/pg_dac_july_2024_module4.pdf'),
(2, 'Module 5 - Database Management', '/files/curriculums/pg_dac_july_2024_module5.pdf'),
(3, 'Module 1 - Mobile Computing', '/files/curriculums/pg_dmc_march_2024_module1.pdf'),
(3, 'Module 2 - Mobile OS', '/files/curriculums/pg_dmc_march_2024_module2.pdf'),
(3, 'Module 3 - Mobile App Development', '/files/curriculums/pg_dmc_march_2024_module3.pdf'),
(3, 'Module 4 - Wireless Networks', '/files/curriculums/pg_dmc_march_2024_module4.pdf'),
(3, 'Module 5 - Mobile Security', '/files/curriculums/pg_dmc_march_2024_module5.pdf'),
(4, 'Module 1 - Embedded Systems', '/files/curriculums/pg_desd_july_2024_module1.pdf'),
(4, 'Module 2 - IoT', '/files/curriculums/pg_desd_july_2024_module2.pdf'),
(4, 'Module 3 - VLSI Design', '/files/curriculums/pg_desd_july_2024_module3.pdf'),
(4, 'Module 4 - Embedded C Programming', '/files/curriculums/pg_desd_july_2024_module4.pdf'),
(4, 'Module 5 - RTOS', '/files/curriculums/pg_desd_july_2024_module5.pdf'),
(5, 'Module 1 - Artificial Intelligence', '/files/curriculums/pg_dai_march_2024_module1.pdf'),
(5, 'Module 2 - Machine Learning', '/files/curriculums/pg_dai_march_2024_module2.pdf'),
(5, 'Module 3 - Deep Learning', '/files/curriculums/pg_dai_march_2024_module3.pdf'),
(5, 'Module 4 - Natural Language Processing', '/files/curriculums/pg_dai_march_2024_module4.pdf'),
(5, 'Module 5 - Computer Vision', '/files/curriculums/pg_dai_march_2024_module5.pdf'),
(6, 'Module 1 - Big Data Analytics', '/files/curriculums/pg_dbda_march_2024_module1.pdf'),
(6, 'Module 2 - Hadoop', '/files/curriculums/pg_dbda_march_2024_module2.pdf'),
(6, 'Module 3 - Spark', '/files/curriculums/pg_dbda_march_2024_module3.pdf'),
(6, 'Module 4 - Data Warehousing', '/files/curriculums/pg_dbda_march_2024_module4.pdf'),
(6, 'Module 5 - Data Visualization', '/files/curriculums/pg_dbda_march_2024_module5.pdf');

-- ============================
-- 5. Insert schedules
-- ============================
INSERT INTO schedules (course_id, module_id, date, start_time, end_time, type, `group`, venue, faculty_id)
VALUES
(1, 1, '2025-09-12', '09:00:00', '11:00:00', 'Lecture', 'A', 'Room 101', 1),
(1, 2, '2025-09-13', '11:00:00', '13:00:00', 'Lab', 'B', 'Lab 202', 3),
(2, 3, '2025-09-14', '10:00:00', '12:00:00', 'Lecture', 'A', 'Room 303', 1),
(2, 4, '2025-09-15', '14:00:00', '16:00:00', 'Lab', 'B', 'Lab 404', 3),
(3, 5, '2025-09-16', '09:00:00', '11:00:00', 'Lecture', 'C', 'Room 505', 1);

-- ============================
-- 6. Insert schedule uploads (only coordinators)
-- ============================
INSERT INTO schedule_uploads (file_path, uploaded_by)
VALUES
('/uploads/schedule_pg_dac_march_2024.pdf', 2),
('/uploads/schedule_pg_dac_july_2024.pdf', 2),
('/uploads/schedule_pg_dmc_march_2024.pdf', 2);

-- ============================
-- 7. Insert logsheets (only staff)
-- ============================
INSERT INTO logsheets (schedule_id, date, start_time, end_time, course_id, module_id, type, status, topics_taught, assignment_given, student_progress, faculty_id)
VALUES
(1, '2025-09-12', '09:00:00', '11:00:00', 1, 1, 'Lecture', 'Approved', 'Introduction to Arrays', 'Implement array operations', 'Good participation', 1),
(2, '2025-09-13', '11:00:00', '13:00:00', 1, 2, 'Lab', 'Pending', 'Sorting Lab - Bubble Sort', 'Code bubble sort', 'Average progress', 3),
(3, '2025-09-14', '10:00:00', '12:00:00', 2, 3, 'Lecture', 'Approved', 'Basics of Thermodynamics', 'Write derivations', 'Excellent response', 1),
(4, '2025-09-15', '14:00:00', '16:00:00', 2, 4, 'Lab', 'Rejected', 'Fluid Mechanics Lab', 'Solve flow problems', 'Poor participation', 3),
(5, '2025-09-16', '09:00:00', '11:00:00', 3, 5, 'Lecture', 'Approved', 'Ohm’s Law & Circuits', 'Circuit exercises', 'Good progress', 1);
