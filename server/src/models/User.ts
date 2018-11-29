import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
  name: String,
  last_name: String,
  email: String,
  phone: String,
  password: String,
  logged: Boolean,
});

export const User = mongoose.model('User', UserSchema );