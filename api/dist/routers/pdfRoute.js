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
const express_1 = __importDefault(require("express"));
const pdfService_1 = require("../services/pdfService");
const pdfRoute = express_1.default.Router();
pdfRoute.get("/pdf", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    console.log(id);
    yield (0, pdfService_1.getPasienData)((chunk) => stream.write(chunk), () => stream.end(), (id === null || id === void 0 ? void 0 : id.toString()) ? id === null || id === void 0 ? void 0 : id.toString() : "");
    const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment;filename=data.pdf",
    });
}));
exports.default = pdfRoute;
