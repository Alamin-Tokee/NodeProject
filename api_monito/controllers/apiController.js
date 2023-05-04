// Create new video
// const { makeDb } = require('mysql-async-simple');
// const { makeDb } = require('../config/db');

const db = require('../config/db');
const axios = require('axios');
// await db.connect(connection);

const getApiStatus = async (url) => {
  //   const response = await axios.get(url);
  //   if (response.status !== 200) {
  //     throw Error(`getGithubId ${response.status} ${accessToken}`);
  //   }
  //   const { id: githubId } = await response.json();
  console.log(url);
  try {
    const response = (response = await axios.get(url));
    console.log(response.status);
    return response.status;
  } catch (error) {
    // console.log(error);
    return error.code;
  }
  //   return response.status;
};

const apiMontorFunction = async (data) => {
  var temp = [];
  var result = [];
  for (var i = 0; i < data.length; i++) {
    try {
      const res = await getApiStatus(data[i]['url']);
      console.log(data[i]['url']);
      if (res === undefined) {
        temp.push(data[i]['url']);
        temp.push('SUCCESS');
      } else {
        temp.push(data[i]['url']);
        temp.push(res);
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(temp);
  result.push(temp);
  return result;
};

const createSingleApi = async (req, res) => {
  const content = req.body;

  let queryString = `INSERT INTO api_monitor (url, status) VALUES ('${content.url}', '${content.status}')`;

  try {
    const result = await db.query(queryString);

    let selectString = `SELECT * FROM api_monitor WHERE id = ${result.insertId}`;
    const selected = await db.query(selectString);

    // console.log(selected);
    res.status(200).json(selected);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllApi = async (req, res) => {
  let queryString = 'SELECT * FROM api_monitor';

  try {
    const result = await db.query(queryString);
    // const arr = [
    //   'http://api3.waltonbd.com/api/ref/door_profile/ref_door_color_name.php',
    // ];
    const rrr = apiMontorFunction(result);
    // const jsondata = JSON.stringify(result);
    console.log(rrr);
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSingleApi = async (req, res) => {
  const id = req.params.id;
  let queryString = `SELECT * FROM api_monitor WHERE id = ${id}`;

  try {
    const result = await db.query(queryString);
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateSingleApi = async (req, res) => {
  const id = req.params.id;
  const content = req.body;
  let queryString = `UPDATE api_monitor SET url = '${content.url}', status = '${content.status}' WHERE id = ${id}`;

  try {
    const result = await db.query(queryString);
    let selectString = `SELECT * FROM api_monitor WHERE id = ${id}`;
    const selected = await db.query(selectString);
    // console.log(selected);
    res.status(200).json(selected);
  } catch (error) {
    res.status(500).json(error);
  }
};

// const deleteSingleApi = async (req, res) => {
//   const id = req.params.id;
//   const { userId } = req.body;

//   try {
//     const post = await Video.findById(id);
//     if (post.userId === userId) {
//       await post.deleteOne();
//       res.status(200).json('Post deleted successfully');
//     } else {
//       res.status(403).json('Action forbidden');
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// router.get('/inventory', (req, res) => {
//   let sql = 'SELECT * FROM inventory';

//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send('Inventory received.');
//   });
// });

module.exports = {
  getAllApi,
  getSingleApi,
  updateSingleApi,
  createSingleApi,
};
