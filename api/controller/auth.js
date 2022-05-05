const User = require('../model/User');
const { createToken } = require('../utils/auth');

exports.index_get = (req, res) => {
  const { jwt } = req.cookies;

  if (!jwt) return res.send('No token');

  return res.send('you have a token');
};

exports.signup_post = async (req, res) => {
  try {
    const { id, username } = await User.signup(
      req.body.username,
      req.body.password
    );
    const token = createToken(id, username);

    return res.status(201).json({ id, username, token });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.login_post = async (req, res) => {
  try {
    const { username, id } = await User.login(
      req.body.username,
      req.body.password
    );

    const token = jwt.sign({ username, id }, process.env.JWT, {
      expiresIn: seconds,
    });

    res.cookie('access-token', token, {
      expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.json({ data: { username, id, token } });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};
