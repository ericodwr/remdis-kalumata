"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePoliCreate = void 0;
const joi_1 = __importDefault(require("joi"));
const validatePoliCreate = (data) => {
    const validatePoliCreate = joi_1.default.object({
        username: joi_1.default.string().min(4).required(),
        password: joi_1.default.string().min(4).required(),
        nama: joi_1.default.string().min(4).required(),
    });
    const isValid = validatePoliCreate.validate(data);
    if (isValid.error) {
        throw new Error(isValid.error.details[0].message);
    }
    return isValid;
};
exports.validatePoliCreate = validatePoliCreate;
