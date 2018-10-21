import mongoose from 'mongoose';

let PowerRanking = new mongoose.Schema({
  teamId: Number,
  ranking: [{teamId: Number}],
  date: { type: Date, default: Date.now }
})
