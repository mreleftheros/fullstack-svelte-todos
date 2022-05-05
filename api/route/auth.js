const router = require('express').Router();
const { index_get, signup_post, login_post } = require('../controller/auth');

router.get('/', index_get);

router.post('/signup', signup_post);
router.post('/login', login_post);

module.exports = router;
