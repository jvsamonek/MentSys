import mongoose from 'mongoose';

var AtividadeSchema = new mongoose.Schema({
  status_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Status'},
  titulo: String,
  start_date: Date,
  end_date: Date,
  user_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  projeto_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Projeto'},
});

export const Atividade = mongoose.model('Atividade', AtividadeSchema );
