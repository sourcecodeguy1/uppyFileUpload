let mysql_connection = require('../db');

let db_rows = [];

function InsertQueryFunction(TableName, Values) {

    //console.log("Coming from insert database script " + Values);

    let insertQuery = "INSERT INTO " + TableName + " (photo_name, expiration) VALUES ?";

        mysql_connection.query(insertQuery, [Values], function (error, rows) {

            if(error){
                console.log("ERROR : ", error);
                getDBRows('error');
                return false;
            } else {

                if(rows.affectedRows > 0){

                    console.log("Number of records inserted: " + rows.affectedRows);
                    console.log("Success!");

                    getDBRows(rows.affectedRows);

                } else {
                    console.log("Error!!!");
                    //return false;
                }

            }

        });
}

function getDBRows(rows){
    return db_rows.push({status: rows});
}

module.exports = {InsertQueryFunction, db_rows};

