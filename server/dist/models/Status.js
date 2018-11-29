"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var StatusSchema = new mongoose_1.default.Schema({
    name: String,
});
exports.Status = mongoose_1.default.model('Status', StatusSchema);
