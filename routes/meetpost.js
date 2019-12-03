// var express = require('express');
// var router = express.Router();
// var Post = require('../models/index.js').Post;   // = db.Post

// router.get('/', function(req, res, next) {
//     res.render('post');
// });

// router.get('/write', function (req, res, next) {
//   res.render('post-write');
// });

// router.post('/write', function (req, res, next) {

//   // 서버에서 디버그. 서버 콘솔에 찍힘
//   // 클라이언트에서 제대로 데이터가 넘어왔는지 확인
//   console.log("데이터??");    
//   console.log(req.body);

//   try {  // create가 실행되는 것에 있어서 에러가 발생하는지 확인
//     Post.create({
//       categoryId: req.body.categoryId,
//       title: req.body.title,
//       headcount: req.body.headcount,
//       participants: 0,
//       age: req.body.age,
//       record: req.body.record,
//       content: req.body.content,
//       good: 0,
//       count: 0,
//       photo: '',
//       userId: 1
//     })
//       .then((result) => {
//         console.log("데이터 처리 완료");
//         console.log(result);
//         res.status(201).json(result);
//       })
//       .catch((err) => {
//         console.log("에러발생");  // create가 실행되면서 에러가 발생하면 이쪽으로
//         console.error(err);
//         next(err);
//       })
//   } catch (err) {
//     console.log(err);  // create 자체가 실행이 안되면 이쪽
//   }
// });

// router.get('/list', function (req, res, next) {

//   res.render('post-list');
//     Post.findAll()
//     .then((posts) => {
//       res.json(posts);
//       console.log(posts);
//     }).catch((err) => {
//       console.error(err);
//       next(err);
//     });

// })


// module.exports = router;

var express = require('express');
var router = express.Router();
var MeetPost = require('../models/index.js').MeetPost;
var Category = require('../models/index.js').Category;
var User = require('../models/index.js').User;

// 글 작성 페이지 렌더링
router.get('/writepage', function (req, res, next) {
  res.render('post-write');
});

// 작성한 글 데이터를 DB에 저장
router.post('/write', function (req, res, next) {
    MeetPost.create({
      categoryId: req.body.categoryId,
      title: req.body.title,
      headcount: req.body.headcount,
      participants: 0,
      age: req.body.age,
      record: req.body.record,
      content: req.body.content,
      good: 0,
      count: 0,
      meetphoto: 'ddd',
      userId: 1,
      createdAt:new Date
    })
      .then((result) => {
        console.log("데이터 처리 완료");
        console.log(result);
        res.status(201).json(result);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
});


// 전체글 리스트 페이지 렌더링
router.get('/', function(req, res, next) {
  res.render('post-list');
});

// 전체글 가져오는 라우터
router.get('/list', function (req, res, next) {
    MeetPost.findAll({
      include: [{ model: Category, }, { model: User}]
    })
    .then((posts) => {
      res.json(posts);
    }).catch((err) => {
      console.error(err);
      next(err);
    });
});

// 상세글 페이지 렌더링
 router.get('/detailpost:id', function(req, res, next) {
   res.render('detailpost'); 
 });


// 글 수정
router.patch('/:id', function(req, res, next) {
  MeetPost.update(
    { 
      
    }, 
    { 
      where: { id: req.params.id } 
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

// 글 삭제
router.delete('/delete/:id', function(req, res, next) {
  MeetPost.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;
