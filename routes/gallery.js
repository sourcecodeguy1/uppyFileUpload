let express = require('express');
let router = express.Router();

let mysql = require('../db');

/* GET gallery page. */
router.get('/', function(req, res, next) {

    mysql.query("SELECT * FROM uploaded_photos", function (error, rows) {
        if(error){
            console.log(error)
        } else {

            if(rows.length > 0){
                console.log(rows);
                res.render('gallery', { title: 'Gallery' , data: rows});
                //res.send("success");
            } else{
                res.render('error', { title: 'No gallery pictures found'});
            }

        }
    });
});

module.exports = router;
