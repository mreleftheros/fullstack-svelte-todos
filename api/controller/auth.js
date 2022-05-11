const User = require('../model/User');
const { createToken, cookieOptions } = require('../utils/auth');

exports.signup_post = async (req, res) => {
  try {
    const { username, password } = User.format(
      req.body.username,
      req.body.password
    );

    const { err } = User.validate(username, password);
    if (err) {
      return res.status(400).json({ ...err, error: 'Validation failed.' });
    }

    const userExists = await User.check(username);
    if (userExists) {
      return res.status(400).json({ error: 'Username already exists.' });
    }

    const { _id } = await User.signup(username, password);

    const token = createToken(_id, username);

    res.cookie('access-token', token, cookieOptions);

    return res.status(201).json({ _id, username, token });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.login_post = async (req, res) => {
  try {
    const { username, password } = req.body;

    const { error, _id } = await User.login(username, password);
    if (error) {
      return res.status(404).json({ error: 'Invalid credentials.' });
    }

    const token = createToken(_id, username);

    res.cookie('access-token', token, cookieOptions);

    return res.json({ _id, username, token });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.me_get = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  return res.json(req.user);
};

exports.logout_get = (req, res) => {
  try {
    res.clearCookie('access-token');
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
