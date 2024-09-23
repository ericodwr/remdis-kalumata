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
exports.getAll = exports.create = void 0;
const database_1 = require("../application/database");
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newRekamMedis = yield database_1.prisma.rekam_medis.create({
        data: Object.assign({}, data),
    });
    return {
        message: 'Create Rekam Medis successfully!',
        data: newRekamMedis,
    };
});
exports.create = create;
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const allRekamMedis = yield database_1.prisma.rekam_medis.findMany();
    return allRekamMedis;
});
exports.getAll = getAll;
