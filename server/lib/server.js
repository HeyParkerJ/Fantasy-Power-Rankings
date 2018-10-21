"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _UserLogin = _interopRequireDefault(require("./model/UserLogin"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose.default.Schema;
var app = (0, _express.default)();
app.use(_bodyParser.default.json({
  limit: "50mb"
}));
app.use(_bodyParser.default.urlencoded({
  limit: "50mb",
  extended: true,
  paremeterLimit: 50000
}));
var mongoDB = 'mongodb://localhost/test';

_mongoose.default.connect(mongoDB);

_mongoose.default.Promise = global.Promise; // Weird

var db = _mongoose.default.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('connection open!!');
});
app.use((0, _cors.default)());
app.get('/data/test', function (req, res) {
  res.send({
    "hello": "world",
    "name": "parker Johnson",
    "data": {
      "data1": "true",
      "data2": false
    }
  });
});
app.get('/data/:year', function (req, res) {
  var year = req.params.year;

  var filePath = _path.default.resolve(process.cwd(), 'data/' + year + '.json');

  _fs.default.stat(filePath, function (error) {
    if (error) {
      console.error('we got an error', error);
      res.send(404);
    } else {
      _fs.default.readFile(filePath, 'utf8', function (error, file) {
        if (error) {
          console.error('Error reading file ' + filePath, error);
          res.send(500);
        } else {
          res.send(file);
        }
      });
    }
  });
});
app.post('/api/login', function (req, res) {
  var userData = {};

  if (req.body.username && req.body.password) {
    userData = {
      username: req.body.username
    };
  }

  _UserLogin.default.find(userData, function (err, user) {
    if (user[0].password === req.body.password) {
      console.log('user passed auth', user);
      res.status(200).send(user);
    } else {
      console.warn('user failed auth', req.body.username, req.body.password);
      res.status(401).send();
    }
  });
});
app.get('/api/getUsers', function (req, res) {
  _UserLogin.default.find({}, function (err, users) {
    var data = [];
    users.forEach(function (user) {
      data.push({
        username: user.username
      });
    });
    res.status(200).send(data);
  });
});
app.get('/api/getTeams', function (req, res) {
  _UserLogin.default.find({}, function (err, users) {
    var data = [];
    users.forEach(function (user) {
      console.log('user', user);
      data.push({
        username: user.username,
        teamId: user.teamId,
        emoji: user.emoji
      });
    });
    console.log('ok heres the data', data);
    res.status(200).send(data);
  });
});
app.post('/powerRankings/makeUser', function (req, res) {
  if (req.body.username && req.body.password && req.body.passwordConf) {
    var userData = {
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf // use scheme.create to insert data into the db

    };
    User.create(userData, function (err, user) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/profile');
      }
    });
  }
});
var port = 1337;
app.listen(port, function () {
  console.log('App listening on port ' + port + '.');
});