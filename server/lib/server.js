"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_bodyParser.default.json({
  limit: "50mb"
}));
app.use(_bodyParser.default.urlencoded({
  limit: "50mb",
  extended: true,
  paremeterLimit: 50000
}));
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
  console.log('retrieved request');
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
var port = 1337;
app.listen(port, function () {
  console.log('App listening on port ' + port + '.');
});