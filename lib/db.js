const { MongoClient } = require('mongodb');

const uri = process.env.DB;
const _dbName = 'main';
const client = new MongoClient(uri);

module.exports = {
  connect: async function() {
    await client.connect();
  },
  getCol: function(name) {
    return client.db(_dbName).collection(name);
  }
}