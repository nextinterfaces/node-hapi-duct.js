This is tutorial of howto install MySQL on MacOS Siera
======


Start / Stop / Restart
-----
```
sudo /usr/local/mysql/support-files/mysql.server start
sudo /usr/local/mysql/support-files/mysql.server stop
sudo /usr/local/mysql/support-files/mysql.server restart
```

Uninstall MySQL
-----
http://community.jaspersoft.com/wiki/uninstall-mysql-mac-os-x

```
sudo rm /usr/local/mysql
sudo rm -rf /usr/local/mysql*
sudo rm -rf /Library/StartupItems/MySQLCOM
sudo rm -rf /Library/PreferencePanes/My*
edit /etc/hostconfig and remove the line MYSQLCOM=-YES-
rm -rf ~/Library/PreferencePanes/My*
sudo rm -rf /Library/Receipts/mysql*
sudo rm -rf /Library/Receipts/MySQL*
sudo rm -rf /private/var/db/receipts/*mysql*
```

Similar https://gist.githubusercontent.com/vitorbritto/ -> rm_mysql.md 

Install MySQL
-----
https://coolestguidesontheplanet.com/get-apache-mysql-php-and-phpmyadmin-working-on-macos-sierra/

Export mysql to path
-----
Update ```~/.bash_profile```
```
source ~/.profile
export PATH=${PATH}:/usr/local/mysql/bin
```

Change root password in mysqld safe mode:
-----
```
sudo mysqld_safe --skip-grant-tables
mysql -u root
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass';
```

```
mysql -h 'localhost' -u 'admin' -p
```

Login to <db_name> directly
```
mysql -h 'localhost' -u 'root' -p <db_name>
```

```
mysql> CREATE Database <db_name>;
mysql> SHOW databases;
mysql> USE <db_name>;
mysql> SHOW tables;
```

Create user
-----
```
mysql> CREATE USER 'admin'@'localhost' IDENTIFIED BY 'some_pass';
mysql> GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;
mysql> CREATE USER 'admin'@'%' IDENTIFIED BY 'some_pass';
mysql> GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;

mysql> SELECT User FROM mysql.user;
mysql> SELECT User, Host, HEX(authentication_string) FROM mysql.user;

-- which user and session status
mysql> SELECT USER(), CURRENT_USER();
mysql> status;
```

Sample data populate
------
https://dev.mysql.com/doc/sakila/en/sakila-installation.html

```
mysql> SOURCE /Users/anna/dev/sakila-db/sakila-schema.sql;
mysql> SOURCE /Users/anna/dev/sakila-db/sakila-data.sql;

mysql> USE sakila;

mysql> SHOW TABLES;

```

Stored procedures
-----
https://dev.mysql.com/doc/sakila/en/sakila-structure-procedures.html
