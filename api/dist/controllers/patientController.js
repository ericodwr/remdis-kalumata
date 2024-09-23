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
exports.createPatientAndRemdis = exports.createPatient = exports.getAllPatient = void 0;
const patientService_1 = require("../services/patientService");
const getAllPatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, patientService_1.getAll)();
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllPatient = getAllPatient;
const createPatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, patientService_1.create)(req.body);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.createPatient = createPatient;
const createPatientAndRemdis = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, patientService_1.createPatientRemdis)(req.body);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.createPatientAndRemdis = createPatientAndRemdis;
