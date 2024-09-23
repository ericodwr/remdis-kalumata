import Joi from 'joi';
import { CreateUser, LoginUser } from '../types/users';

export const validateUserCreate = (data: CreateUser) => {
  const validateUserCreate = Joi.object({
    username: Joi.string().min(4).required(),
    password: Joi.string().min(4).required(),
    nama: Joi.string().min(4).required(),
    roleId: Joi.string().required(),
  });

  const isValid = validateUserCreate.validate(data);

  if (isValid.error) {
    throw new Error(isValid.error.details[0].message);
  }
  return isValid;
};

export const validateUserLogin = (data: LoginUser) => {
  const validateLoginUser = Joi.object({
    username: Joi.string().min(4).required(),
    password: Joi.string().min(4).required(),
  });

  const isValid = validateLoginUser.validate(data);

  if (isValid.error) {
    throw new Error(isValid.error.details[0].message);
  }
  return isValid;
};

