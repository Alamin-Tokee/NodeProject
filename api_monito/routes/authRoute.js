// routes/inventory.js
const express = require('express');
const router = express.Router();

const {
  registerUserApi,
  loginUserApi,
} = require('../controllers/authController');

// router.get('/inventory', (req, res) => {
//   let sql = 'SELECT * FROM inventory';

//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send('Inventory received.');
//   });
// });

router.post('/signup', registerUserApi);
router.post('/signin', loginUserApi);

module.exports = router;
