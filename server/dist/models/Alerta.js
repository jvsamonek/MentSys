"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var AlertaSchema = new mongoose_1.default.Schema({
    reason: String,
    status: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Status' },
    task: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Tarefa' },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
});
exports.Alerta = mongoose_1.default.model('Alerta', AlertaSchema);
