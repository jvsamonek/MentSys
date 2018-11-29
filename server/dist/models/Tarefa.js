"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var TarefaSchema = new mongoose_1.default.Schema({
    status_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Status' },
    titulo: String,
    start_date: Date,
    end_date: Date,
    user_id: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
    projeto_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Projeto' },
});
exports.Tarefa = mongoose_1.default.model('Tarefa', TarefaSchema);
