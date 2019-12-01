var express = require('express');
var router = express.Router();
var User = require('../models/index.js').User;
var Usercateogory = require('../models/usercategory').Usercateogory;


router.get('/', function(req, res, next) {
    res.render('join');
});
    

router.post('/', async (req, res, next) => {


  // try {  // create가 실행되는 것에 있어서 에러가 발생하는지 확인

  //   if(req.body.useremail == User.useremail) {
  //     return res.send('이미 존재하는 이메일입니다.');
  //   }

  //   User.create({
  //     userId: req.body.userId,
  //     useremail: req.body.useremail,
  //     userpw: req.body.userpw,
  //     username: req.body.username,
  //     birth: req.body.birth,
  //     gender: req.body.gender,
  //     phone: req.body.phone,
  //     info: req.body.info,
  //     photofullroute: req.body.photofullroute,
  //   })
  //     .then((result) => {
  //       console.log("데이터 처리 완료");
  //       console.log(result);
  //       res.status(201).json(result);
  //     })
  //     .catch((err) => {
  //       console.log("에러발생");  // create가 실행되면서 에러가 발생하면 이쪽으로
  //       console.error(err);
  //       next(err);
  //     })
  // } catch (err) {
  //   console.log(err);  // create 자체가 실행이 안되면 이쪽
  // }

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
    

    // const exemail = await User.findOne({where: {useremail}});

    // if(exemail) {
    //     res.send('이미 가입된 이메일입니다.');
    // } else {

      if(useremail.length <= 0) {
        return res.send('이메일을 입력해주세요.');
      }
      if(userpw.length <= 0) {
        return res.send('비밀번호를 입력해주세요.');
      }
      if(userpw.length < 7) {
        return res.send('비밀번호는 7글자 이상 적어주세요.');
      }
      if(userpw != userpwre) {
        return res.send('비밀번호가 일치하지 않습니다.');
      }
      if(username.length <= 0) {
        return res.send('이름을 입력해주세요.');
      }
      if(birth.length == 0 || birth.length < 6 || birth.length >= 7) {
        return res.send('생년월일을 올바르게 입력해주세요.');
      }
      if(phone.length == 0 || phone.length < 11 || phone.length >= 12) {
        return res.send('전화번호를 올바르게 입력해주세요.');
      }
        
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
            res.status(201).json(result);
        })
        .catch((err) => {
            next(err);
        });
    //}
 
  } catch(error) {
      console.error(error);
      return next(error);
    }
    
});

router.post('/double_check', async (req, res, next) => {

  const useremail = req.body.useremail;

  const exemail = await User.findOne({where: {useremail}});

    if(exemail) {
        return res.send('이미 가입된 이메일입니다.');
    } else {
        return res.send('사용 가능한 이메일입니다.');
    }
    
});
  
  
 module.exports = router;