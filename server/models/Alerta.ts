import mongoose from 'mongoose';

var AlertaSchema = new mongoose.Schema({
  reason: String,
  projeto_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Projeto'},
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

export const Alerta = mongoose.model('Alerta', AlertaSchema );
