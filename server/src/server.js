import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import UserLogin from './model/UserLogin'
import mongoose from 'mongoose';

import Moment from 'moment'
import DateUtils from './DateUtils'

let Schema = mongoose.Schema;

const app = express()
app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({limit:"50mb", extended:true, paremeterLimit:50000}))

let mongoDB = 'mongodb://localhost/test'
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise; // Weird
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('connection open!!')
})


app.use(cors())

app.get('/data/test', (req, res) => {
  res.send({
    "hello": "world",
    "name": "parker Johnson",
    "data": {
      "data1": "true",
      "data2": false
    }
  })
})

app.get('/data/:year', (req, res) => {
    const year = req.params.year
    const filePath = path.resolve(process.cwd(), 'data/'+year+'.json')
    fs.stat(filePath, (error) => {
        if(error) {
            console.error('we got an error', error)
            res.send(404)
        } else {
            fs.readFile(filePath, 'utf8', (error, file) => {
                if(error) {
                    console.error('Error reading file '+filePath, error)
                    res.send(500)
                } else {
                    res.send(file)
                }
            })
        }
    })
})

app.post('/api/login', (req, res) => {
  let userData = {}
  if(req.body.username &&
      req.body.password) {

    userData = {
      username: req.body.username,
    }
  }

  UserLogin.find(userData, function(err, user) {
    if(user[0].password === req.body.password) {
      console.log('user passed auth', user)

      let data = {
        teamId: user[0].teamId,
        username: user[0].username,
        emoji: user[0].emoji
      }
      
      res.status(200).send(data)
    } else {
      console.warn('user failed auth', req.body.username, req.body.password)
      res.status(401).send()
    }
  })
})

app.get('/api/getUsers', (req, res) => {
  UserLogin.find({}, function(err, users) {
    let data = []
    users.forEach((user) => {
      data.push({username: user.username})
    })
    res.status(200).send(data);
  })
})

app.get('/api/getTeams', (req, res) => {
  UserLogin.find({}, function(err, users) {
    let data = []
    users.forEach((user) => {
      data.push({username: user.username, teamId: user.teamId, emoji: user.emoji})
    })

    res.status(200).send(data);
  })
})

app.post('/api/postPowerRankings', (req, res) => {
  let week = DateUtils.findWeekByDate(Moment.now())

  console.log('found week', week)

  if(false) {
    PowerRankings.update({teamId: req.body.teamId,
                          week: week},
                         { $set: { rankings: [ req.body.rankings ] } }
                        )
  }
})

// TODO - Delete
app.post('/powerRankings/makeUser', (req, res) => {
  if(req.body.username &&
     req.body.password &&
     req.body.passwordConf) {
    var userData = {
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    // use scheme.create to insert data into the db
    User.create(userData, function(err, user) {
      if(err) {
        return next(err)
      } else {
        return res.redirect('/profile');
      }
    })
  }
})


const port = 1337
app.listen(port, () => {
    console.log('App listening on port '+port+'.')
})

