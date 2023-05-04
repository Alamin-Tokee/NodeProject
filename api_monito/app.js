var express = require('express');
var app = express();
const colors = require('colors');
const morgan = require('morgan');
var bodyparser = require('body-parser').json();

// 1. Require the connection to the database.
// var connection = require('./config/db').databaseConnection;

const api = require('./routes/showRoute');
const auth = require('./routes/authRoute');

app.use(morgan('dev'));
app.use(bodyparser);

// 2. Make the GET request.
// app.get('/inventory', (req, res) => {
//   let sql = 'SELECT * FROM api_monitor';

//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send(result);

//     // res.send('Inventory received');
//   });
// });

app.use('/api/content', api);
app.use('/api/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(colors.yellow.bold(`Server Listening on ${port}`));
});
