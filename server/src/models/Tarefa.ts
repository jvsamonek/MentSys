import mongoose from 'mongoose';

var TarefaSchema = new mongoose.Schema({
  status_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Status'},
  titulo: String,
  start_date: Date,
  end_date: Date,
  user_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  projeto_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Projeto'},
});

export const Tarefa = mongoose.model('Tarefa', TarefaSchema );
