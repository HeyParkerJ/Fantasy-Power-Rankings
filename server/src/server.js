import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';

const app = express()

app.use(cors())
app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({limit:"50mb", extended:true, paremeterLimit:50000}))

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
    console.log('retrieved request')
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

const port = 1337
app.listen(port, () => {
    console.log('App listening on port '+port+'.')
})

