import { CreateRole, Role } from '../types/roles';
import { prisma } from '../application/database';
import { validateRoleCreate } from '../validations/roleValidation';

export const getAll = async () => {
  const allRole = await prisma.roles.findMany();

  return allRole;
};

export const create = async (body: CreateRole) => {
  const { nama } = body;

  validateRoleCreate(body);

  const newRole = await prisma.roles.create({
    data: {
      nama,
    },
  });

  return {
    message: 'role created!',
    data: newRole,
  };
};
