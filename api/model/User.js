const { getCol, getId } = require('../lib/db');
const col = getCol('user');
const argon = require('argon2');

class User {
  static format(username, password) {
    if (typeof username !== 'string') {
      username = '';
    } else if (typeof password !== 'string') {
      password = '';
    }

    return {
      username: username.trim(),
      password,
    };
  }

  static validate(username, password) {
    const err = {};

    if (!username) {
      err.username = 'Must provide username.';
    } else if (username.length < 4) {
      err.username = 'Username must contain at least 4 characters.';
    }

    if (!password) {
      err.password = 'Must provide password.';
    } else if (password.length < 6) {
      err.password = 'Password must contain at least 6 characters.';
    }

    return err;
  }

  static async check(username) {
    const userExists = await col.findOne({ username });

    return !!userExists;
  }

  static async signup(username, password) {
    const hashedPassword = await argon.hash(password);

    const { insertedId } = await col.insertOne({
      username,
      password: hashedPassword,
    });

    return {
      _id: insertedId.toString(),
    };
  }

  static async login(username, password) {
    const result = await col.findOne({ username });

    if (!result) {
      return { error: 'Invalid credentials.' };
    }

    const passwordMatches = await argon.verify(result.password, password);

    if (!passwordMatches) {
      if (!result) {
        return { error: 'Invalid credentials.' };
      }
    }

    return {
      _id: result._id.toString(),
    };
  }

  static async getById(id) {
    const result = await col.findOne({ _id: getId(id) });

    if (!result) throw new Error('Id not found.');

    return {
      _id: result._id.toString(),
      username: result.username,
    };
  }
}

module.exports = User;
