import mongoose from 'mongoose';

let PowerRanking = new mongoose.Schema({
  teamId: Number,
  rankings: [{teamId: Number}],
  date: { type: Date, default: Date.now }
})
