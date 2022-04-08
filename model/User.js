const { getCol } = require('../lib/db');
const col = getCol('users');
const bcrypt = require('bcryptjs');

class User {
  static cleanUp(username, password) {
    if (typeof username !== 'string' || typeof password !== 'string')
      throw new Error('Invalid data.');

    return {
      username: username.trim(),
      password,
    };
  }

  static validate(username, password) {
    if (username.length < 4 || password.length < 6)
      throw new Error('Invalid credentials.');
    return;
  }

  static async checkDuplicate(username) {
    const userExists = await col.findOne({ username });

    if (userExists) throw new Error('User already exists.');
    return;
  }

  static async signup(username, password) {
    ({ username, password } = this.cleanUp(username, password));
    this.validate(username, password);
    await this.checkDuplicate(username);

    const hashedPassword = await bcrypt.hash(password, 10);
    const { insertedId } = await col.insertOne({
      username,
      password: hashedPassword,
    });

    return {
      username,
      id: insertedId.toString(),
    };
  }
}

module.exports = User;
