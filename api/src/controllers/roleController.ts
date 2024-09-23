import { Request, Response, NextFunction } from 'express';
import { create, getAll } from '../services/roleService';

export const getAllRole = async (
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

export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const result = await create(data);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
