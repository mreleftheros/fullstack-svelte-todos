const { MongoClient, ObjectId } = require('mongodb');

const _dbName = 'main';
const client = new MongoClient(process.env.DB);

module.exports = {
  connect: async function () {
    await client.connect();
  },
  getCol: function (name) {
    return client.db(_dbName).collection(name);
  },
  getId: function (id) {
    return ObjectId(id);
  },
  isValidId: function (id) {
    return ObjectId.isValid(id);
  },
};
