const router = require('express').Router();
const sequelize = require('../config/connection');
const { Artists } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Artists.findAll({
        where: {
            user_id: req.session.user_id
        },
    })
    .then(dbArtistsData => {
        const artists = dbArtistsData.map(artists => artists.get({
            plain: true
        }));
        res.render('dashboard', {
            artists,
            loggedIn: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', withAuth, (req, res) => {
    Artists.findOne({
        where: {
            id: req.params.id
        },
    })
    .then(dbArtistsData => {
        if (!dbArtistsData) {
            res.status(404).json({
                message: 'No artist found with this id'
            });
            return;
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;