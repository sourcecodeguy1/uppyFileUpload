const cron = require('node-cron');
const mysql_connection = require('../db'); // Database connection file.
const fs = require('fs');
let cronSchedule = cron.schedule('0 */1 * * *', () => {

    let time = Date.now(); /**Get the current time and date**/

    let sql = "SELECT * FROM uploaded_photos";
    mysql_connection.query(sql, function (error, rows) {

        if (error){

            console.log(error);

        } else {

            if(rows.length > 0){

                let i;

                for(i = 0; i < rows.length; i++){

                    let photoName =  rows[i].photo_name;
                    let expiration = rows[i].expiration;

                    if(time > expiration){

                        let delete_sql = "DELETE FROM uploaded_photos WHERE photo_name = ?";
                        mysql_connection.query(delete_sql, [photoName], function (error, rows) {

                            if (error){
                                console.log(error);
                            } else {

                                if(rows.affectedRows > 0){
                                    fs.unlink('public/images/' + photoName, function (error) {
                                       if(error) throw error;
                                    });
                                    console.log("Deleted entries");
                                } else {
                                    console.log("Nothing deleted");
                                }

                            }

                        });

                    } else {
                        console.log("Link is still active");
                    }

                }

            } else {
                console.log("Nothing to delete here");
            }
        }



    });

}); /**END OF CRON JOB**/

module.exports = cronSchedule;