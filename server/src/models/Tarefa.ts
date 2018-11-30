import mongoose from 'mongoose';

var TarefaSchema = new mongoose.Schema({
  statusId: {type: mongoose.Schema.Types.ObjectId, ref: 'Status'},
  title: String,
  startDate: {type: Date, default: Date.now},
  endDate: {type: Date, default: Date.now},
  userId: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  projetoId: {type: mongoose.Schema.Types.ObjectId, ref: 'Projeto'},
});

export const Tarefa = mongoose.model('Tarefa', TarefaSchema );
