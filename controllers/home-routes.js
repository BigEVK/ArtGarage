const router = require('express').Router();
const sequelize = require('../config/connection');

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
        res.redirect('/login');
    })
})
module.exports = router;