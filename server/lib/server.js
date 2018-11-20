"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _UserLogin = _interopRequireDefault(require("./model/UserLogin"));

var _PowerRanking = _interopRequireDefault(require("./model/PowerRanking"));

var _moment = _interopRequireDefault(require("moment"));

var _DateUtils = _interopRequireDefault(require("./DateUtils"));

var Schema = _mongoose.default.Schema;
var app = (0, _express.default)();
app.use(_bodyParser.default.json({
  limit: '50mb'
}));
app.use(_bodyParser.default.urlencoded({
  limit: '50mb',
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
      var data = {
        teamId: user[0].teamId,
        username: user[0].username,
        emoji: user[0].emoji
      };
      res.status(200).send(data);
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
      data.push({
        username: user.username,
        teamId: user.teamId,
        emoji: user.emoji
      });
    });
    res.status(200).send(data);
  });
});
app.post('/api/postPowerRankings', function (req, res) {
  var currentTime = _moment.default.now();

  var week;

  try {
    //week = DateUtils.determineWeekOfSubmission(currentTime)
    week = 12;
  } catch (err) {
    console.error('Rankings were submitted while submissions are closed', (0, _moment.default)(currentTime), req.body);
    return res.status(401).send('Not allowed to send subimssions during gametime');
  }

  var powerRankingData = {
    week: week,
    teamId: req.body.teamId,
    rankings: req.body.rankings
  };
  var options = {
    upsert: true
  };

  _PowerRanking.default.updateOne({
    teamId: req.body.teamId,
    weekId: week
  }, {
    $set: {
      rankings: [req.body.rankings]
    }
  }, options, function (err, data) {
    if (err) {
      res.status(500).send('Something went wrong submitting PowerRankings', err, data);
    } else {
      res.status(200).send('Successfully updated rankings');
    }
  });
});
app.get('/api/getAllPowerRankings', function (req, res) {
  _PowerRanking.default.find({}, function (err, rankings) {
    var formattedData = {};
    rankings.forEach(function (d) {
      var weekId = d.weekId;
      formattedData[weekId] = formattedData[weekId] || [];
      formattedData[weekId].push(d);
    });
    res.status(200).send(formattedData);
  });
});
/*
  app.get('/api/rankings/:userId/:seasonId/:weekId', (req, res) => {
PowerRanking.find({}, (err, rankings) => {
  let formattedData = {}

  rankings.forEach(d => {
    let weekId = d.weekId
    formattedData[weekId] = formattedData[weekId] || []
    formattedData[weekId].push(d)
  })

  res.status(200).send(formattedData)
})
*/

var port = 1337;
app.listen(port, function () {
  console.log('App listening on port ' + port + '.');
});