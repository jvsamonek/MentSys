import mongoose from 'mongoose';

var AlertaSchema = new mongoose.Schema({
  reason: String,
  projetoId: {type: mongoose.Schema.Types.ObjectId, ref: 'Projeto'},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

export const Alerta = mongoose.model('Alerta', AlertaSchema );
