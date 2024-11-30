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
exports.getAllPatientWithFilterDate = exports.createPatientAndRemdis = exports.getAllPatientByPoliAdmin = exports.getAllPatientByPoli = exports.deletePatient = exports.updatePatient = exports.createPatient = exports.getAllPatient = void 0;
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
const updatePatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, patientService_1.edit)(req.body);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.updatePatient = updatePatient;
const deletePatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const result = yield (0, patientService_1.remove)((id === null || id === void 0 ? void 0 : id.toString()) ? id === null || id === void 0 ? void 0 : id.toString() : "");
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.deletePatient = deletePatient;
const getAllPatientByPoli = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { poliId, id } = req.query;
        const result = yield (0, patientService_1.getPatientAndRemdisByPoli)(id === null || id === void 0 ? void 0 : id.toString(), poliId === null || poliId === void 0 ? void 0 : poliId.toString());
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllPatientByPoli = getAllPatientByPoli;
const getAllPatientByPoliAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const result = yield (0, patientService_1.getPatientAndAllRemdis)(id === null || id === void 0 ? void 0 : id.toString());
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllPatientByPoliAdmin = getAllPatientByPoliAdmin;
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
const getAllPatientWithFilterDate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { prevDate, createdBy } = req.query;
        const result = yield (0, patientService_1.getPatientWithFilterDate)(prevDate, createdBy);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllPatientWithFilterDate = getAllPatientWithFilterDate;
