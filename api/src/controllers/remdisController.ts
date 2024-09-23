import { Request, Response, NextFunction } from 'express';
import { create, getAll } from '../services/remdisService';

export const createRemdis = async (
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

export const getAllRemdis = async (
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
