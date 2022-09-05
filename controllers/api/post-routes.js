const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
// get all blogs
router.get('/', (req, res) => {
    console.log('======================');
    Blog.findAll({
        attributes: [
            'id',
            'user_id',
            'title',
            'content',
            'price',
            'image_urls',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;