const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.send('Hello World');
});

app.post('/', (req, res) => {
  const { name } = req.body;

  if (!name)
    return res.status(400).json({ ok: false, error: 'No name provided' });

  return res.json({ ok: true, data: { name } });
});

module.exports = app;
