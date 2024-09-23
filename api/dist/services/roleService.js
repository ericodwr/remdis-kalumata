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
exports.create = exports.getAll = void 0;
const database_1 = require("../application/database");
const roleValidation_1 = require("../validations/roleValidation");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const allRole = yield database_1.prisma.roles.findMany();
    return allRole;
});
exports.getAll = getAll;
const create = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { nama } = body;
    (0, roleValidation_1.validateRoleCreate)(body);
    const newRole = yield database_1.prisma.roles.create({
        data: {
            nama,
        },
    });
    return {
        message: 'role created!',
        data: newRole,
    };
});
exports.create = create;
