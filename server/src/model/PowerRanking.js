import mongoose from 'mongoose';

let PowerRankingSchema = new mongoose.Schema({
  teamId: {
    type: Number,
    required: true,
  },
  weekId: {
    type: Number,
    required: true,
  },
  rankings: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
})

let PowerRanking = mongoose.model('PowerRanking', PowerRankingSchema);

export default PowerRanking;
