"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatientWithFilterDate = exports.createPatientRemdis = exports.getPatientAndAllRemdis = exports.getPatientAndRemdisByPoli = exports.getAll = exports.remove = exports.edit = exports.create = void 0;
const database_1 = require("../application/database");
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newPatient = yield database_1.prisma.pasien.create({
        data: Object.assign({}, data),
    });
    return {
        message: "Create Patient Successfully!",
        data: newPatient,
    };
});
exports.create = create;
const edit = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const updatePatient = yield database_1.prisma.pasien.update({
        where: {
            id: data.id,
        },
        data,
    });
    return {
        message: "Update patient Successfully!",
        data: updatePatient,
    };
});
exports.edit = edit;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletePatient = database_1.prisma.pasien.delete({
        where: { id },
    });
    const deleteRemdis = database_1.prisma.rekam_medis.deleteMany({
        where: { pasienId: id },
    });
    yield database_1.prisma.$transaction([deleteRemdis, deletePatient]);
    return { message: "Delete Patient Successfully!" };
});
exports.remove = remove;
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const allPatient = yield database_1.prisma.pasien.findMany({
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
});
exports.getAll = getAll;
const getPatientAndRemdisByPoli = (id, poliId) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield database_1.prisma.pasien.findUnique({
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
});
exports.getPatientAndRemdisByPoli = getPatientAndRemdisByPoli;
const getPatientAndAllRemdis = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield database_1.prisma.pasien.findUnique({
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
});
exports.getPatientAndAllRemdis = getPatientAndAllRemdis;
const createPatientRemdis = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { patient, remdis } = data;
    const newPatient = yield database_1.prisma.pasien.create({
        data: Object.assign(Object.assign({}, patient), { rekam_medis: {
                create: Object.assign({}, remdis),
            } }),
    });
    return { message: "Patient created successfully!" };
});
exports.createPatientRemdis = createPatientRemdis;
const getPatientWithFilterDate = (date, createdBy) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const prevDate = new Date(date);
    let patients;
    let visitors;
    // Filtered by poli
    if (createdBy == "") {
        patients = yield database_1.prisma.pasien.findMany({
            where: {
                createdAt: {
                    gte: prevDate,
                    lte: currentDate,
                },
            },
        });
        visitors = yield database_1.prisma.pasien.findMany({
            where: {
                rekam_medis: {
                    some: {
                        createdAt: {
                            gte: prevDate,
                            lte: currentDate,
                        },
                    },
                },
            },
            select: {
                rekam_medis: {
                    select: { createdAt: true },
                    where: {
                        createdAt: {
                            gte: prevDate,
                            lte: currentDate,
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });
        return {
            patients,
            visitors,
        };
        // Filtered by poli
    }
    else {
        patients = yield database_1.prisma.pasien.findMany({
            where: {
                createdAt: {
                    gte: prevDate,
                    lte: currentDate,
                },
                createdBy,
            },
        });
        visitors = yield database_1.prisma.pasien.findMany({
            where: {
                rekam_medis: {
                    some: {
                        createdAt: {
                            gte: prevDate,
                            lte: currentDate,
                        },
                    },
                },
                createdBy,
            },
            select: {
                rekam_medis: {
                    select: { createdAt: true },
                    where: {
                        createdAt: {
                            gte: prevDate,
                            lte: currentDate,
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });
        return {
            patients,
            visitors,
        };
    }
});
exports.getPatientWithFilterDate = getPatientWithFilterDate;
