import { prisma } from '../application/database';
import { CreateRekamMedis } from '../types/rekam_medis';

export const create = async (data: CreateRekamMedis) => {
  const newRekamMedis = await prisma.rekam_medis.create({
    data: { ...data },
  });

  return {
    message: 'Create Rekam Medis successfully!',
    data: newRekamMedis,
  };
};

export const getAll = async () => {
  const allRekamMedis = await prisma.rekam_medis.findMany();

  return allRekamMedis;
};
