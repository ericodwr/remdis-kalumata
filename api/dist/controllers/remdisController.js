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
exports.getAllRemdis = exports.createRemdis = void 0;
const remdisService_1 = require("../services/remdisService");
const createRemdis = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, remdisService_1.create)(req.body);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.createRemdis = createRemdis;
const getAllRemdis = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, remdisService_1.getAll)();
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllRemdis = getAllRemdis;
