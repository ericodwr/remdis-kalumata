import { prisma } from "../application/database";
import { CreatePatient, EditPatient } from "../types/pasien";
import {
  CreateRekamMedis,
  CreateRekamMedisWithPatient,
} from "../types/rekam_medis";

type CreatePatientRemdis = {
  patient: CreatePatient;
  remdis: CreateRekamMedisWithPatient;
};

export const create = async (data: CreatePatient) => {
  const newPatient = await prisma.pasien.create({
    data: { ...data },
  });

  return {
    message: "Create Patient Successfully!",
    data: newPatient,
  };
};

export const edit = async (data: EditPatient) => {
  const updatePatient = await prisma.pasien.update({
    where: {
      id: data.id,
    },
    data,
  });

  return {
    message: "Update patient Successfully!",
    data: updatePatient,
  };
};

export const remove = async (id: string) => {
  const deletePatient = prisma.pasien.delete({
    where: { id },
  });

  const deleteRemdis = prisma.rekam_medis.deleteMany({
    where: { pasienId: id },
  });

  await prisma.$transaction([deleteRemdis, deletePatient]);

  return { message: "Delete Patient Successfully!" };
};

export const getAll = async () => {
  const allPatient = await prisma.pasien.findMany({
    include: {
      rekam_medis: {
        select: {
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return allPatient;
};

export const getPatientAndRemdisByPoli = async (
  id: string | undefined,
  poliId: string | undefined
) => {
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
          createdAt: "desc",
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

export const getPatientAndAllRemdis = async (id: string | undefined) => {
  const patient = await prisma.pasien.findUnique({
    where: {
      id,
    },
    include: {
      rekam_medis: {
        orderBy: {
          createdAt: "desc",
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

  return { message: "Patient created successfully!" };
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

  // const previousData = new Date(prevDate.getTime() - 7 * 24 * 60 * 60 * 1000);

  // const prevPatients = await prisma.pasien.findMany({
  //   where: {
  //     createdAt: {
  //       gte: previousData,
  //       lte: prevDate,
  //     },
  //   },
  // });

  return {
    data: patients,
    // prevData: prevPatients,
  };
};
