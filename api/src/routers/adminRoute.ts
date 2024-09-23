import express from 'express';
import { createRole, getAllRole } from '../controllers/roleController';
import {
  createUser,
  getAllUsers,
  loginUser,
} from '../controllers/userController';
import {
  createPatient,
  createPatientAndRemdis,
  getAllPatient,
  getAllPatientByPoli,
  getAllPatientWithFilterDate,
} from '../controllers/patientController';
import { createRemdis, getAllRemdis } from '../controllers/remdisController';
import {
  createPoli,
  getAllPoliUsers,
  removePoli,
} from '../controllers/poliController';

const adminRoute = express.Router();

adminRoute.get('/user', getAllUsers);
adminRoute.post('/user', createUser);
adminRoute.post('/login', loginUser);

adminRoute.get('/role', getAllRole);
adminRoute.post('/role', createRole);

adminRoute.get('/patient', getAllPatient);
adminRoute.post('/patient', createPatient);
adminRoute.get('/patient-filter', getAllPatientWithFilterDate);

adminRoute.get('/remdis', getAllRemdis);
adminRoute.post('/remdis', createRemdis);

adminRoute.get('/poli', getAllPoliUsers);
adminRoute.post('/poli', createPoli);
adminRoute.delete('/poli', removePoli);

adminRoute.get('/patient-remdis', getAllPatientByPoli);
adminRoute.post('/patient-remdis', createPatientAndRemdis);

export default adminRoute;
