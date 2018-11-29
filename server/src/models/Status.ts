import mongoose from 'mongoose';

var StatusSchema = new mongoose.Schema({
  name: String,
});

export const Status = mongoose.model('Status', StatusSchema );