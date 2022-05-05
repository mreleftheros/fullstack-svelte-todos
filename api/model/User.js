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

  static isValid(username, password) {
    if (!username || username.length < 4 || !password || password.length < 6)
      return false;
    return true;
  }

  static async isUnique(username) {
    const userExists = await col.findOne({ username });

    return !userExists;
  }

  static async signup(username, password) {
    ({ username, password } = this.format(username, password));

    const isValid = this.isValid(username, password);
    if (!isValid) throw Error('Invalid credentials.');

    const isUnique = await this.isUnique(username);
    if (!isUnique) throw Error('Username already exists.');

    const hashedPassword = await argon.hash(password);
    const { acknowledged, insertedId } = await col.insertOne({
      username,
      password: hashedPassword,
    });

    if (!acknowledged) throw Error('Could not save user to the database.');

    return {
      username,
      id: insertedId.toString(),
    };
  }

  static async login(username, password) {
    const user = await col.findOne({ username });

    if (!user) throw new Error('Invalid credentials.');

    const passwordMatches = await argon.verify(user.password, password);

    if (!passwordMatches) throw new Error('Invalid credentials.');

    return {
      username: user.username,
      id: user._id.toString(),
    };
  }
}

module.exports = User;
