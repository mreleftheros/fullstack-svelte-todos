const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  const token = req.cookies['access-token'];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT);

      req.user = decoded;
      return next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token.' });
    }
  } else {
    return res.status(401).json({ error: 'Must provide a token.' });
  }
};
