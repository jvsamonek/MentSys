import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  phone: String,
  password: String,
  logged: Boolean,
});

export const User = mongoose.model('User', UserSchema );