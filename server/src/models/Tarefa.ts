import mongoose from 'mongoose';

var TarefaSchema = new mongoose.Schema({
  statusId: {type: mongoose.Schema.Types.ObjectId, ref: 'Status'},
  title: String,
  startDate: Date,
  endDate: Date,
  userId: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  projetoId: {type: mongoose.Schema.Types.ObjectId, ref: 'Projeto'},
});

export const Tarefa = mongoose.model('Tarefa', TarefaSchema );
