var express = require('express');
var router = express.Router();
var Post = require('../models/index.js').Post;   // = db.Post

router.get('/', function(req, res, next) {
    res.render('post');
});

router.get('/write', function (req, res, next) {
  res.render('post-write');
});

router.post('/write', function (req, res, next) {

  // 서버에서 디버그. 서버 콘솔에 찍힘
  // 클라이언트에서 제대로 데이터가 넘어왔는지 확인
  console.log("데이터??");    
  console.log(req.body);

  try {  // create가 실행되는 것에 있어서 에러가 발생하는지 확인
    Post.create({
      categoryId: req.body.categoryId,
      title: req.body.title,
      headcount: req.body.headcount,
      participants: 0,
      age: req.body.age,
      record: req.body.record,
      content: req.body.content,
      good: 0,
      count: 0,
      photo: '',
      userId: 1
    })
      .then((result) => {
        console.log("데이터 처리 완료");
        console.log(result);
        res.status(201).json(result);
      })
      .catch((err) => {
        console.log("에러발생");  // create가 실행되면서 에러가 발생하면 이쪽으로
        console.error(err);
        next(err);
      })
  } catch (err) {
    console.log(err);  // create 자체가 실행이 안되면 이쪽
  }
});

router.get('/list', function (req, res, next) {

  res.render('post-list');
    Post.findAll()
    .then((posts) => {
      res.json(posts);
      console.log(posts);
    }).catch((err) => {
      console.error(err);
      next(err);
    });

})


module.exports = router;