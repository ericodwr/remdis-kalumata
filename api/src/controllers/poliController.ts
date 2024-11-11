import { Request, Response, NextFunction } from "express";
import {
  create,
  editName,
  getAllPoliByRole,
  remove,
} from "../services/poliService";

export const getAllPoliUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getAllPoliByRole();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createPoli = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const removePoli = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const result = await remove(id?.toString() ? id?.toString() : "");
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const editNamePoli = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await editName(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
