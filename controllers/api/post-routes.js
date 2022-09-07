const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
// get all blogs
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    // attributes: [
    //   'id',
    //   'user_id',
    //   'title',
    //   'content',
    //   'price',
    //   'image_url',
    //   'date_created',
    // ],
    include: [
      {
        model: Comment,
        // attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      // {
      //   model: User,
      //   attributes: ['username']
      // }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Post.create({
      id: req.body.id,
      price: req.body.price,
      title: req.body.title,
      content: req.body.content,
      image_url: req.body.image_url,
      user_id: req.session.user_id
  })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
      });
});


router.post('/comment', (req, res) => {
  Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.body.user_id
  })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
      });
});

module.exports = router;