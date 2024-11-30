"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editNamePoli = exports.removePoli = exports.createPoli = exports.getAllPoliUsers = void 0;
const poliService_1 = require("../services/poliService");
const getAllPoliUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, poliService_1.getAllPoliByRole)();
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllPoliUsers = getAllPoliUsers;
const createPoli = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, poliService_1.create)(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.createPoli = createPoli;
const removePoli = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const result = yield (0, poliService_1.remove)((id === null || id === void 0 ? void 0 : id.toString()) ? id === null || id === void 0 ? void 0 : id.toString() : "");
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.removePoli = removePoli;
const editNamePoli = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, poliService_1.editName)(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.editNamePoli = editNamePoli;
