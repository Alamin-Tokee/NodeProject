const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const registerUserApi = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const email = req.body.email;

  const content = req.body;
  console.log(content);

  try {
    let selectUserString = `SELECT * FROM api_user WHERE email = '${email}'`;
    const result = await db.query(selectUserString);

    console.log(result.length);

    if (result.length > 0) {
      res.status(400).json({ message: 'User already exits' });
    } else {
      let insertUserString = `INSERT INTO api_user (first_name, last_name, email, password) VALUES ('${content.firstname}', '${content.lastname}', '${content.email}', '${content.password}')`;
      const userInset = await db.query(insertUserString);
      console.log(userInset);
      let userSelectId = `SELECT * FROM api_user WHERE id = ${userInset.insertId}`;
      const user = await db.query(userSelectId);

      const token = jwt.sign(
        { username: content.email, id: userInset.insertId },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
      );
      res.status(200).json({ user, token });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUserApi = async (req, res) => {
  const { email, password } = req.body;

  try {
    const selectUserString = `SELECT * FROM api_user WHERE email = '${email}'`;
    const user = await db.query(selectUserString);
    // console.log(user[0]['password']);
    if (user.length > 0) {
      const id = user[0]['id'];
      const hashpass = user[0]['password'];
      const validity = await bcrypt.compare(password, hashpass);
      if (!validity) {
        res.status(400).json('Wrong password');
      } else {
        const token = jwt.sign(
          { email: email, id: id },
          process.env.JWT_KEY,
          { expiresIn: '1h' }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json({ message: 'User does not exits' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUserApi,
  loginUserApi,
};
