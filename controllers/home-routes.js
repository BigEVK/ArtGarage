const router = require('express').Router();
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
  // console.log(req.session);
  // Post.findAll({
  //   limit: 5,
  //   order: [['created_at', 'DESC']],
  //   attributes: [
  //     'id',
  //     'title',
  //     'created_at',
  //     'content'
  //   ],
  //   include: [
  //     {
  //       model: Comment,
  //       attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
  //       include: {
  //         model: User,
  //         attributes: ['username']
  //       }
  //     },
  //     {
  //       model: User,
  //       attributes: ['username']
  //     }
  //   ]
  // })
  //   .then(dbPostData => {
  //     const posts = dbPostData.map(post => post.get({ plain: true }));
      // pass a single post object into the homepage template
      res.render('homepage', {  });
    // })
    // .catch(err => {
    //   console.log(err);
    //   res.status(500).json(err);
    // });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
})
  ;
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    req.session = null;
    res.redirect('/');
  })
})

// SIGNUP route:
router.get('/signup', (req, res) => {
  const{type: user_type} = req.query;
  res.render('signup', {user_type: user_type || 'buyer', isArtist: user_type === 'artist'});
});

router.get('/profile/:id', (req, res) => {
  const {id} = req.params;
  res.render('artist-profile-page');
});

router.get('/update-profile', (req, res) => {
  const { id } = req.params;
  res.render('artist-update-page', {id});
});

router.get('/add-comments', (req, res) => {
  res.render('single-post');
});

router.get('/artists', (req, res) => {
  res.render('dashboard');
});

module.exports = router;