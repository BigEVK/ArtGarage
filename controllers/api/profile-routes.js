const router = require('express').Router();
const { User, Profile } = require('../../models');
// const withAuth = require('../../utils/auth');

//Create a comment
router.post('/', (req, res) => {
  Profile.create({
    name: req.body.name,
    snippet: req.body.snippet,
    url: req.body.url,
    bio: req.body.bio,
    artwork_title: req.body.artwork_title,
    price: req.body.price,
    dimensions: req.body.dimensions,
    art_description: req.body.art_description,
    profile_id: req.session.user_id
  })
    .then(dbCommentData => {
      res.redirect('/update-profile')
    })
    .catch(err => {
      console.log(err);
      res.redirect('/update-profile?err=' + err.message)
    });
});

//Get all comments
// router.get("/", (req, res) => {
//   Comment.findAll()
//     .then((dbCommentData) => res.json(dbCommentData))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });


module.exports = router;