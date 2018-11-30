"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var TarefaSchema = new mongoose_1.default.Schema({
    status: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Status' },
    title: String,
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    project: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Projeto' },
});
exports.Tarefa = mongoose_1.default.model('Tarefa', TarefaSchema);
