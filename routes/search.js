var express = require('express');
var router = express.Router();

var MeetPost = require('../models/index.js').MeetPost;
const Op = sequelize.Op;


router.get('/', function (req, res) {
    res.render('search');
  });


router.post('/:searchWord', function (req, res, next) {
    
    var searchWord = req.params.searchWord;

    MeetPost.findAll({
        where:{
            title: {
                [Op.like]: "%" + searchWord + "%"
            }
        }
    })
        .then( (result) => {
            res.json(result)
        })
        .catch( (err) => {
            console.log(err)
        })
});

module.exports = router;