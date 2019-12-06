var express = require('express');

//단방향 암호화(복호화가 안되는) 노드팩키지 참조
const bcrypt = require('bcrypt');

var User = require('../models/index.js').User;
var Usercateogory = require('../models/usercategory').Usercateogory;

var router = express.Router();

//회원가입
router.get('/join', function(req, res, next) {
    res.render('join');
});
    
router.post('/join', async (req, res, next) => {

    try {

      const useremail = req.body.useremail;
      const userpw = req.body.userpw;
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
        
        //단방향 암호화를 통해 난독화 및 복호화불가한 문자열로 변환
        const hash = await bcrypt.hash(req.body.userpw, 12);
        
        await User.create({
          useremail: useremail,
          userpw: hash,
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

//이메일 중복체크
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

//로그인
router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login', async (req, res, next) => {

    const useremail = req.body.useremail;
    
    try {
  
      const exemail = await User.findOne({where: {useremail}});
  
      if(exemail) {
  
          //const expw = await User.findOne({where: {userpw}});
          const result = await bcrypt.compare(req.body.userpw, exemail.userpw);
  
          if(result) {
              res.json({
                  success: true,
                  message: '로그인 성공!'
              })
          } else {
              res.json({
                  success: false,
                  message: '비밀번호가 틀렸습니다.'
              })
          }
  
      } else {
          res.json({
              success: false,
              message: '사용자 정보가 존재하지 않습니다.' 
          })
      }
   
      } catch(error) {
        console.error(error);
        return next(error);
      }
  
}); 
  
 module.exports = router;