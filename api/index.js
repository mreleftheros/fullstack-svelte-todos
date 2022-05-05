require('dotenv').config();
const { connect } = require('./lib/db');
const app = require('./app');

const port = process.env.PORT || 5000;

connect()
  .then(() => {
    console.log('Database connection established.');
    app.listen(port, () => console.log(`Server running on port ${port}...`));
  })
  .catch(e => {
    console.log(e.message);
    process.exit(1);
  });
