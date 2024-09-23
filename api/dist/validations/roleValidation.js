"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRoleCreate = void 0;
const joi_1 = __importDefault(require("joi"));
const validateRoleCreate = (data) => {
    const validateRole = joi_1.default.object({
        nama: joi_1.default.string().min(2).required(),
    });
    const isValid = validateRole.validate(data);
    if (isValid.error) {
        throw new Error(isValid.error.details[0].message);
    }
    return isValid;
};
exports.validateRoleCreate = validateRoleCreate;
