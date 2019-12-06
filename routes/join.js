var express = require('express');
var router = express.Router();
var User = require('../models/index.js').User;
var Usercateogory = require('../models/usercategory').Usercateogory;


router.get('/', function(req, res, next) {
    res.render('join');
});
    

router.post('/', async (req, res, next) => {

    try {

      const useremail = req.body.useremail;
      const userpw = req.body.userpw;
      const userpwre = req.body.userpwre;
      const username = req.body.username;
      const birth = req.body.birth;
      const gender = req.body.gender;
      const phone = req.body.phone;
      const info = req.body.info;
      const photofullroute = req.body.photofullroute;


      const exemail = await User.findOne({where: {useremail}});

      if(exemail) {
        res.json({
          success: false,
          message: '이메일 중복확인을 해주세요.'
        })
      } else {
        await User.create({
          useremail: useremail,
          userpw: userpw,
          username: username,
          birth: birth,
          gender: gender,
          phone: phone,
          info: info,
          photofullroute: photofullroute,
        })
        .then((result) => {
          res.json({
            success: true,
            message: '회원가입 성공!'
          })
        })
        .catch((err) => {
            next(err);
        });
      }
 
    } catch(error) {
        console.error(error);
        return next(error);
      }
    
});

router.post('/double_check', async (req, res, next) => {

  const useremail = req.body.useremail;

  const exemail = await User.findOne({where: {useremail}});

    if(exemail) {
      res.json({
        success: false,
        message: '이미 가입된 이메일입니다.'
      })
    } else {
      res.json({
        success: true,
        message: '사용 가능한 이메일입니다.'
      })
    }
    
});
  
  
 module.exports = router;