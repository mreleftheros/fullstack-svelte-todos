const jwt = require('jsonwebtoken');
const User = require('../model/User');

exports.protect = async (req, res, next) => {
  const token = req.cookies['access-token'];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT);

      const result = await User.findById(decoded['0']);
      req.user = result;
      return next();
    } catch (err) {
      return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
    }
  } else {
    return res.status(400).json({ error: 'Must provide token.' });
  }
};
