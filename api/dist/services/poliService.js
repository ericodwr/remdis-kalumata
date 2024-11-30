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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editName = exports.remove = exports.create = exports.getAllPoliByRole = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../application/database");
const poliValidation_1 = require("../validations/poliValidation");
const getAllPoliByRole = () => __awaiter(void 0, void 0, void 0, function* () {
    const allPoli = yield database_1.prisma.users.findMany({
        where: {
            role: {
                nama: "poli",
            },
        },
    });
    return allPoli;
});
exports.getAllPoliByRole = getAllPoliByRole;
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    (0, poliValidation_1.validatePoliCreate)(data);
    const role = yield database_1.prisma.roles.findFirst({
        where: {
            nama: "poli",
        },
    });
    const hashPassword = yield bcryptjs_1.default.hash(data.password, 15);
    data.password = hashPassword;
    const newUser = yield database_1.prisma.users.create({
        data: Object.assign(Object.assign({}, data), { roleId: (role === null || role === void 0 ? void 0 : role.id) ? role.id : "" }),
    });
    return {
        message: "Create user success!",
        data: newUser,
    };
});
exports.create = create;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.prisma.users.delete({
        where: {
            id,
        },
    });
    return {
        message: "Delete Poli successfully!",
    };
});
exports.remove = remove;
const editName = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.prisma.users.update({
        where: { id: data.id },
        data: { nama: data.nama },
    });
    return { message: "Update Poli successfully!" };
});
exports.editName = editName;
