const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
    where: { type: req.body.type }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: { id: req.params.id }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {

  User.findOne({ where: req.body.username })
    .then(dbUserData => {
      if (User.checkPassword(req.body.password)) {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
          req.session.isArtist = dbUserData.type === 'artist';

          res.redirect('/artists')
        })
      } else {
        res.status(500).send('invalid password');
      }

    }).catch(err => {
      res.status(500).send(err.message);
    })
});

router.post('/signup', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    type: req.body.user_type
  })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        req.session.isArtist = req.body.user_type === 'artist';

        res.redirect(req.session.isArtist ? '/update-profile' : '/artists')
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete route
router.delete('/:id', withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;