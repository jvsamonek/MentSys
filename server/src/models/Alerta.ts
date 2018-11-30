import mongoose from 'mongoose';

var AlertaSchema = new mongoose.Schema({
  reason: String,
  projeto: {type: mongoose.Schema.Types.ObjectId, ref: 'Projeto'},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

export const Alerta = mongoose.model('Alerta', AlertaSchema );
