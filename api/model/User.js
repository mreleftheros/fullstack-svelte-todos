const { getCol } = require('../lib/db');
const col = getCol('users');
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
    let err = {};

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

    return {
      isValid: Object.keys(err).length === 0,
      err,
    };
  }

  static async isUnique(username) {
    const userExists = await col.findOne({ username });

    return !userExists;
  }

  static async signup(username, password) {
    ({ username, password } = this.format(username, password));

    const { isValid, err } = this.validate(username, password);

    if (!isValid) return { ...err, ok: false };

    const isUnique = await this.isUnique(username);
    if (!isUnique) throw { message: 'Username already exists.' };

    const hashedPassword = await argon.hash(password);
    const { acknowledged, insertedId } = await col.insertOne({
      username,
      password: hashedPassword,
    });

    if (!acknowledged) throw { message: 'Could not save user to database.' };

    return {
      ok: true,
      username,
      id: insertedId.toString(),
    };
  }

  static async login(username, password) {
    const user = await col.findOne({ username });

    if (!user) throw { message: 'Invalid credentials.' };

    const passwordMatches = await argon.verify(user.password, password);

    if (!passwordMatches) throw { message: 'Invalid credentials.' };

    return {
      username: user.username,
      id: user._id.toString(),
    };
  }
}

module.exports = User;
