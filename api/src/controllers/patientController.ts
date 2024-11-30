import { Request, Response, NextFunction } from "express";
import {
  create,
  createPatientRemdis,
  edit,
  getAll,
  getPatientAndAllRemdis,
  getPatientAndRemdisByPoli,
  getPatientWithFilterDate,
  remove,
} from "../services/patientService";

export const getAllPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
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
  next: NextFunction
) => {
  try {
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updatePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await edit(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deletePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const result = await remove(id?.toString() ? id?.toString() : "");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllPatientByPoli = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { poliId, id } = req.query;

    const result = await getPatientAndRemdisByPoli(
      id?.toString(),
      poliId?.toString()
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllPatientByPoliAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;

    const result = await getPatientAndAllRemdis(id?.toString());
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createPatientAndRemdis = async (
  req: Request,
  res: Response,
  next: NextFunction
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
  next: NextFunction
) => {
  try {
    const { prevDate, createdBy } = req.query;
    const result = await getPatientWithFilterDate(prevDate, createdBy);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
