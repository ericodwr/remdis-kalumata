import bycrypt from "bcryptjs";

import { prisma } from "../application/database";
import { CreatePoli } from "../types/poli";
import { validatePoliCreate } from "../validations/poliValidation";

export const getAllPoliByRole = async () => {
  const allPoli = await prisma.users.findMany({
    where: {
      role: {
        nama: "poli",
      },
    },
  });
  return allPoli;
};

export const create = async (data: CreatePoli) => {
  validatePoliCreate(data);

  const role = await prisma.roles.findFirst({
    where: {
      nama: "poli",
    },
  });

  const hashPassword = await bycrypt.hash(data.password, 15);

  data.password = hashPassword;

  const newUser = await prisma.users.create({
    data: {
      ...data,
      roleId: role?.id ? role.id : "",
    },
  });

  return {
    message: "Create user success!",
    data: newUser,
  };
};

export const remove = async (id: string) => {
  await prisma.users.delete({
    where: {
      id,
    },
  });

  return {
    message: "Delete Poli successfully!",
  };
};

export const editName = async (data: { id: string; nama: string }) => {
  await prisma.users.update({
    where: { id: data.id },
    data: { nama: data.nama },
  });

  return { message: "Update Poli successfully!" };
};
