let express = require('express');
let router = express.Router();

router.get('/error', function (req, res) {

    res.render("error", {title: "No gallery pictures found"});

});

module.exports = router;