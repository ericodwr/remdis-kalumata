"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.web = void 0;
const express_1 = __importDefault(require("express"));
const adminRoute_1 = __importDefault(require("../routers/adminRoute"));
const auth_jwt_1 = __importDefault(require("../middleware/auth-jwt"));
const cors_1 = __importDefault(require("cors"));
const pdfRoute_1 = __importDefault(require("../routers/pdfRoute"));
exports.web = (0, express_1.default)();
exports.web.use(express_1.default.json());
exports.web.use((0, cors_1.default)());
exports.web.use(auth_jwt_1.default);
exports.web.use(adminRoute_1.default);
exports.web.use(pdfRoute_1.default);
