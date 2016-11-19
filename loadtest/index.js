var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'admin',
    password : '123',
    database : 'sakila'
});

connection.connect();

connection.query('SELECT * FROM actor', function(err, rows, fields) {
    if (!err)
        console.log('The solution is: ', rows);
    else
        console.log('Error while performing Query.');
});

connection.end();