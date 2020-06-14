let mysql = require('mysql');
require('dotenv').config();

let mysql_connection = mysql.createPool({
    connectionLimit : 100,
    waitForConnections : true,
    queueLimit :0,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    debug    :  true,
    wait_timeout : 28800,
    connect_timeout :10
});

mysql_connection.getConnection(function (err) {
    if(err){
        console.log(err);
    } else {
        console.log("You have connected to the database successfully.");
    }
});

module.exports = mysql_connection;
