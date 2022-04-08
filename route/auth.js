const router = require('express').Router();
const { get_, post_signup } = require('../controller/auth');

router.get('/', get_);

router.post('/signup', post_signup);

module.exports = router;
