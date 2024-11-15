"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roleController_1 = require("../controllers/roleController");
const userController_1 = require("../controllers/userController");
const patientController_1 = require("../controllers/patientController");
const remdisController_1 = require("../controllers/remdisController");
const adminRoute = express_1.default.Router();
adminRoute.get('/user', userController_1.getAllUsers);
adminRoute.post('/user', userController_1.createUser);
adminRoute.post('/user/login', userController_1.loginUser);
adminRoute.get('/role', roleController_1.getAllRole);
adminRoute.post('/role', roleController_1.createRole);
adminRoute.get('/patient', patientController_1.getAllPatient);
adminRoute.post('/patient', patientController_1.createPatient);
adminRoute.get('/remdis', remdisController_1.getAllRemdis);
adminRoute.post('/remdis', remdisController_1.createRemdis);
adminRoute.post('/patient-remdis', patientController_1.createPatientAndRemdis);
exports.default = adminRoute;
