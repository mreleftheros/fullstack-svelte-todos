const { getCol, getId } = require('../lib/db');
const col = getCol('todo');

class Todo {
  static validate(text) {
    text = text.trim();
    const err = {};

    if (!text || typeof text !== 'string') {
      err.text = 'Must provide text.';
    } else if (text.length < 4 || text.length > 30) {
      err.text = 'Text must be between 4-30 characters.';
    }

    return { text, err };
  }

  static async create(text, id) {
    const { insertedId } = await col.insertOne({
      text,
      isDone: false,
      userId: getId(id),
    });

    return {
      _id: insertedId,
    };
  }

  static async getAllByUser(id) {
    const result = await col.find({ userId: getId(id) }).toArray();

    return result;
  }

  static async getById(id) {
    const result = await col.findOne({ _id: getId(id) });

    if (!result) return null;

    return {
      ...result,
      _id: result._id.toString(),
      userId: result.userId.toString(),
    };
  }

  static async setById(id, body) {
    const result = await col.updateOne(
      { _id: getId(id) },
      { $set: { ...body } }
    );

    return result;
  }

  static async deleteById(id) {
    const result = await col.deleteOne({ _id: getId(id) });

    return result;
  }
}

module.exports = Todo;
