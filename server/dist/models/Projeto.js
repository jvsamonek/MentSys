"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var ProjetoSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    startDate: Date,
    endDate: Date,
    imagePath: String,
});
exports.Projeto = mongoose_1.default.model('Projeto', ProjetoSchema);
