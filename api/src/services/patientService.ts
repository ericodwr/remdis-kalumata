import { prisma } from '../application/database';
import { CreatePatient } from '../types/pasien';
import {
  CreateRekamMedis,
  CreateRekamMedisWithPatient,
} from '../types/rekam_medis';

type CreatePatientRemdis = {
  patient: CreatePatient;
  remdis: CreateRekamMedisWithPatient;
};

export const create = async (data: CreatePatient) => {
  const newPatient = await prisma.pasien.create({
    data: { ...data },
  });

  return {
    message: 'Create Patient Successfully!',
    data: newPatient,
  };
};

export const getAll = async () => {
  const allPatient = await prisma.pasien.findMany({
    include: {
      rekam_medis: {
        select: {
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  return allPatient;
};

export const getPatientAndRemdisByPoli = async (
  id: string | undefined,
  poliId: string | undefined,
) => {
  // const allPatient = await prisma.pasien.findMany({
  //   // where: {
  //   //   createdBy: id,
  //   // },
  //   include: {
  //     rekam_medis: {
  //       where: { userId: id },
  //     },
  //   },
  // });

  const patient = await prisma.pasien.findUnique({
    where: {
      id,
    },
    include: {
      rekam_medis: {
        where: {
          userId: poliId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              nama: true,
            },
          },
        },
      },
    },
  });

  return patient;
};

export const createPatientRemdis = async (data: CreatePatientRemdis) => {
  const { patient, remdis } = data;

  const newPatient = await prisma.pasien.create({
    data: {
      ...patient,
      rekam_medis: {
        create: {
          ...remdis,
        },
      },
    },
  });

  return { message: 'Patient created successfully!' };
};

export const getPatientWithFilterDate = async (data: any) => {
  const currentDate = new Date();

  const prevDate = new Date(data);

  const patients = await prisma.pasien.findMany({
    where: {
      createdAt: {
        gte: prevDate,
        lte: currentDate,
      },
    },
  });

  const previousData = new Date(prevDate.getTime() - 7 * 24 * 60 * 60 * 1000);

  const prevPatients = await prisma.pasien.findMany({
    where: {
      createdAt: {
        gte: previousData,
        lte: prevDate,
      },
    },
  });

  return {
    currentData: patients,
    prevData: prevPatients,
  };
};
