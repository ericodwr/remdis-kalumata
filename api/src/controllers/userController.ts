import { Request, Response, NextFunction } from 'express';
import { create, getAll, login } from '../services/userService';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getAll();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const result = await create(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const result = await login(body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
