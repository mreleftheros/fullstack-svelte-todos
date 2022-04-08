const User = require('../model/User');

exports.get_ = (req, res) => {
  return res.send('get auth test');
};

exports.post_signup = async (req, res) => {
  try {
    const { username, id } = await User.signup(
      req.body.username,
      req.body.password
    );
    return res.json({ data: { username, id } });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};
