const User = require('../model/User');
const { createToken } = require('../utils/auth');

exports.signup_post = async (req, res) => {
  try {
    try {
      const result = await User.signup(req.body.username, req.body.password);

      if (!result.ok) {
        const { ok, ...err } = result;
        return res.status(400).json({ ...err, error: 'Validation failed.' });
      }

      const { id, username } = result;

      const token = createToken(id, username);

      res.cookie('access-token', token, {
        expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      return res.status(201).json({ id, username, token });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.login_post = async (req, res) => {
  try {
    try {
      const { username, id } = await User.login(
        req.body.username,
        req.body.password
      );

      const token = createToken(id, username);

      res.cookie('access-token', token, {
        expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      return res.json({ username, id });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.me_get = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  return res.json(req.user);
};