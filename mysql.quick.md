https://dev.mysql.com/doc/sakila/en/sakila-structure-procedures.html


https://coolestguidesontheplanet.com/get-apache-mysql-php-and-phpmyadmin-working-on-macos-sierra/

sudo /usr/local/mysql/support-files/mysql.server start
sudo /usr/local/mysql/support-files/mysql.server stop
sudo /usr/local/mysql/support-files/mysql.server restart

SELECT User, Host, HEX(authentication_string) FROM mysql.user;

SHOW databases;

CREATE DATABASE menagerie;

USE menagerie;

// login to 'menagerie' directly
mysql -h 'localhost' -u 'root' -p menagerie


// populate db
SOURCE /Users/anna/dev/sakila-db/sakila-schema.sql;
SOURCE /Users/anna/dev/sakila-db/sakila-data.sql;

USE sakila;

SHOW TABLES;