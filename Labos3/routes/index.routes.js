const express = require('express');
const session = require('express-session');
const router = express.Router();

router.get('/', function(req, res){
    req.session.data = req.session.data || [];
    res.render("index", {
        data : req.session.data
    });
});


router.get('/index', function(req, res){
    req.session.data = req.session.data || [];
    res.render("index", {
        data : req.session.data
    });
});



module.exports = router;