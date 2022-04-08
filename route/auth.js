const router = require('express').Router();
const { get_, post_signup, post_login } = require('../controller/auth');

router.get('/', get_);

router.post('/signup', post_signup);
router.post('/login', post_login);

module.exports = router;
