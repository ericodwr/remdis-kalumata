"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserLogin = exports.validateUserCreate = void 0;
const joi_1 = __importDefault(require("joi"));
const validateUserCreate = (data) => {
    const validateUserCreate = joi_1.default.object({
        username: joi_1.default.string().min(4).required(),
        password: joi_1.default.string().min(4).required(),
        nama: joi_1.default.string().min(4).required(),
        roleId: joi_1.default.string().required(),
    });
    const isValid = validateUserCreate.validate(data);
    if (isValid.error) {
        throw new Error(isValid.error.details[0].message);
    }
    return isValid;
};
exports.validateUserCreate = validateUserCreate;
const validateUserLogin = (data) => {
    const validateLoginUser = joi_1.default.object({
        username: joi_1.default.string().min(4).required(),
        password: joi_1.default.string().min(4).required(),
    });
    const isValid = validateLoginUser.validate(data);
    if (isValid.error) {
        throw new Error(isValid.error.details[0].message);
    }
    return isValid;
};
exports.validateUserLogin = validateUserLogin;
