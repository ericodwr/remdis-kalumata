"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.web = void 0;
const express_1 = __importDefault(require("express"));
const adminRoute_1 = __importDefault(require("../routers/adminRoute"));
exports.web = (0, express_1.default)();
exports.web.use(express_1.default.json());
// web.use(authJwt);
exports.web.use(adminRoute_1.default);
