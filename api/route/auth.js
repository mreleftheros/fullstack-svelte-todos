const router = require('express').Router();
const { me_get, signup_post, login_post, logout_get } = require('../controller/auth');
const { protect } = require('../middlware/auth');

router.post('/signup', signup_post);
router.post('/login', login_post);
router.get('/me', protect, me_get);
router.get('/logout', protect, logout_get);

module.exports = router;
