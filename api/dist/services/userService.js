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
exports.login = exports.create = exports.getAll = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../application/database");
const userValidation_1 = require("../validations/userValidation");
const response_error_1 = __importDefault(require("../error/response-error"));
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUser = yield database_1.prisma.users.findMany({
        include: {
            role: true,
        },
    });
    return {
        data: allUser,
    };
});
exports.getAll = getAll;
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    (0, userValidation_1.validateUserCreate)(data);
    const hashPassword = yield bcryptjs_1.default.hash(data.password, 15);
    data.password = hashPassword;
    const newUser = yield database_1.prisma.users.create({
        data: Object.assign({}, data),
    });
    return {
        message: 'Create user success!',
        data: newUser,
    };
});
exports.create = create;
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    (0, userValidation_1.validateUserLogin)(data);
    const user = yield database_1.prisma.users.findUnique({
        where: {
            username: data.username,
        },
        include: {
            role: true,
        },
    });
    if (!user)
        throw new response_error_1.default(403, 'username or password invalid!');
    const isPasswordValid = yield bcryptjs_1.default.compare(data.password, user.password);
    if (!isPasswordValid)
        throw new response_error_1.default(403, 'username or password invalid!');
    const jwt_key = process.env.JWT_KEY || '';
    const token = jsonwebtoken_1.default.sign({ username: data.username, role: user.role.nama }, jwt_key, {
        expiresIn: '24hr',
    });
    const [newUser] = yield database_1.prisma.$transaction([
        database_1.prisma.users.update({
            where: {
                username: data.username,
            },
            data: {
                token,
                updatedAt: new Date(),
            },
            include: {
                role: true,
            },
        }),
    ]);
    return {
        username: newUser.username,
        nama: newUser.nama,
        token: newUser.token,
        role: newUser.role.nama,
    };
});
exports.login = login;
