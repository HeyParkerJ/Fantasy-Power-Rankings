import mongoose from 'mongoose';
let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
});
let UserLogin = mongoose.model('UserLogin', UserSchema);

export default UserLogin;
