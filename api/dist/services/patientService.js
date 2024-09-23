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
exports.createPatientRemdis = exports.getAll = exports.create = void 0;
const database_1 = require("../application/database");
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newPatient = yield database_1.prisma.pasien.create({
        data: Object.assign({}, data),
    });
    return {
        message: 'Create Patient Successfully!',
        data: newPatient,
    };
});
exports.create = create;
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const allPatient = yield database_1.prisma.pasien.findMany({
        include: {
            rekam_medis: true,
        },
    });
    return allPatient;
});
exports.getAll = getAll;
const createPatientRemdis = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { patient, remdis } = data;
    const newPatient = yield database_1.prisma.pasien.create({
        data: Object.assign(Object.assign({}, patient), { rekam_medis: {
                createMany: {
                    data: remdis,
                },
            } }),
    });
    return newPatient;
});
exports.createPatientRemdis = createPatientRemdis;
