import Joi from 'joi';
import { CreateRole } from '../types/roles';

export const validateRoleCreate = (data: CreateRole) => {
  const validateRole = Joi.object({
    nama: Joi.string().min(2).required(),
  });

  const isValid = validateRole.validate(data);

  if (isValid.error) {
    throw new Error(isValid.error.details[0].message);
  }
  return isValid;
};
