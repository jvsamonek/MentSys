import mongoose from 'mongoose';

var AlertaSchema = new mongoose.Schema({
  reason: String,
  status: {type: mongoose.Schema.Types.ObjectId, ref: 'Status'},
  task: {type: mongoose.Schema.Types.ObjectId, ref: 'Tarefa'},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  project: {type: mongoose.Schema.Types.ObjectId, ref: 'Projeto'}
});

export const Alerta = mongoose.model('Alerta', AlertaSchema );
