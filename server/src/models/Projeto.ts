import mongoose from 'mongoose';

var ProjetoSchema = new mongoose.Schema({
  title: String,
  description: String,
  startDate: {type: Date, default: Date.now},
  endDate: {type: Date, default: Date.now},
  imagePath: String,
});

export const Projeto = mongoose.model('Projeto', ProjetoSchema );