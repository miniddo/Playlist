var express = require('express');
var router = express.Router();
var User = require('../models/index.js').User;


router.get('/', function(req, res, next) {
    res.render('join');
});

router.post('/', async (req, res, next) => {
    User.create({
        useremail: req.body.useremail,
        userpw: req.body.userpw,
    }).then((result) => {
        console.log(result);
        res.status(201).json(result);
      })
      .catch((err)=>{
        console.error(err);
        next(err);
      });
});        
  
  
 module.exports = router;