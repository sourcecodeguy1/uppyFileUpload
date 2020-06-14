let express = require('express');
let router = express.Router();
let fs = require('fs');
let mysql = require('../db');

/* GET gallery page. */
router.post('/', function(req, res, next) {

    let id = req.body.id;
    let photoName = req.body.photoName;

    let delete_image_sql = "DELETE FROM uploaded_photos WHERE id = ?";

    mysql.query(delete_image_sql, [id], function (error, rows) {
        if(error){
            console.log(error);
        } else {

            if(rows.affectedRows > 0){
                fs.unlink('public/images/' + photoName, function (err) {
                    if(err) throw err;
                });

                let countSQL = "SELECT COUNT(*) AS countRows FROM uploaded_photos";

                mysql.query(countSQL, function (error, rows) {
                    res.json({result: "success", count: rows[0].countRows});
                });


            } else{
                res.json({result: "An error has occurred."});
            }

        }
    });


});

module.exports = router;
