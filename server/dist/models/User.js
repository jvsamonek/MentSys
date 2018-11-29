"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var UserSchema = new mongoose_1.default.Schema({
    name: String,
    last_name: String,
    email: String,
    phone: String,
    password: String,
    logged: Boolean,
});
exports.User = mongoose_1.default.model('User', UserSchema);
