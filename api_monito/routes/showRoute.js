// routes/inventory.js
const express = require('express');
const router = express.Router();

const {
  createSingleApi,
  getAllApi,
  getSingleApi,
  updateSingleApi,
} = require('../controllers/apiController');

// router.get('/inventory', (req, res) => {
//   let sql = 'SELECT * FROM inventory';

//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send('Inventory received.');
//   });
// });

router.post('/create', createSingleApi);
router.get('/', getAllApi);
router.get('/:id', getSingleApi);
router.put('/update/:id', updateSingleApi);

module.exports = router;
