CREATE USER 'logsheet'@'%' IDENTIFIED BY 'Loggs@123';

GRANT ALL PRIVILEGES ON logsheet_app.* TO 'logsheet'@'localhost';

FLUSH PRIVILEGES;

exit;
