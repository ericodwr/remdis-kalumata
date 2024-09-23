import Joi from 'joi';
import { CreatePoli } from '../types/poli';

export const validatePoliCreate = (data: CreatePoli) => {
  const validatePoliCreate = Joi.object({
    username: Joi.string().min(4).required(),
    password: Joi.string().min(4).required(),
    nama: Joi.string().min(4).required(),
  });

  const isValid = validatePoliCreate.validate(data);

  if (isValid.error) {
    throw new Error(isValid.error.details[0].message);
  }
  return isValid;
};
