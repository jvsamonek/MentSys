import mongoose from 'mongoose';

var ProjetoSchema = new mongoose.Schema({
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
  imagePath: String,
});

export const Projeto = mongoose.model('Projeto', ProjetoSchema );