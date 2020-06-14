let express = require('express');

let router = express.Router();

let path = require('path');

const multer = require('multer');

const mysql = require('../functions/mysqlQueries');


/* POST upload route. */
router.post('/',(req, res) => {
  let newFileName;

  let expiration = Date.now() + 3600000; // 1 hour

  let data = [];

  let storage = multer.diskStorage({

    destination: function (req, file, callback) {
      callback(null, 'public/images');
    },

    filename: function (req, file, callback) {

      callback(null, newFileName = Date.now() + path.extname(file.originalname));

      data.push([newFileName, expiration]);
    }

  });


  let upload = multer({storage: storage}).any();

  upload(req, res, function (err) {

    if (err) {

      return res.end("Error uploading file. " + err);

    } else {

      /**CALL THE INSERT QUERY FUNCTION**/

      mysql.InsertQueryFunction('uploaded_photos', data);

      res.redirect("/gallery");
    }
  });


});

module.exports = router;
