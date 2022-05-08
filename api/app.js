const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const auth = require('./route/auth');

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Serve frontend
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')))

//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//     )
//   )
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'))
// }

app.use('/api/auth', auth);

module.exports = app;
