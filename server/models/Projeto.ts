import mongoose from 'mongoose';

var ProjetoSchema = new mongoose.Schema({
  title: String,
  description: String,
  start_date: Date,
  end_date: Date,
  image_path: String,
});

export const Projeto = mongoose.model('Projeto', ProjetoSchema );