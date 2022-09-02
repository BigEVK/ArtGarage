const router = require('express').Router();

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        req.session = null;
        res.redirect('/login');
    })
})
module.exports = router;