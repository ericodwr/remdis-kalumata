import { Request, Response, NextFunction } from 'express';
import {
  create,
  createPatientRemdis,
  getAll,
  getPatientAndRemdisByPoli,
  getPatientWithFilterDate,
} from '../services/patientService';

export const getAllPatient = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createPatient = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllPatientByPoli = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { poliId, id } = req.query;

    const result = await getPatientAndRemdisByPoli(
      id?.toString(),
      poliId?.toString(),
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createPatientAndRemdis = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await createPatientRemdis(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllPatientWithFilterDate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getPatientWithFilterDate(req.query.prevDate);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
