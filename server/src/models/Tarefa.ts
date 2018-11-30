import mongoose from 'mongoose';

var TarefaSchema = new mongoose.Schema({
  status: {type: mongoose.Schema.Types.ObjectId, ref: 'Status'},
  title: String,
  startDate: {type: Date, default: Date.now},
  endDate: {type: Date, default: Date.now},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  project: {type: mongoose.Schema.Types.ObjectId, ref: 'Projeto'},
});

export const Tarefa = mongoose.model('Tarefa', TarefaSchema );
