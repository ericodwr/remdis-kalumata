import { RekamMedisResDto } from '../remdis/RemdisResDto';

export interface PatientResDto {
  id: string;
  nama: string;
  NIK: string;
  alamat: string;
  usia: number;
  no_telp: string;
  jenis_kelamin: string;
  agama: string;
  pekerjaan: string;
  createdAt: Date;
  updatedAt: Date;
  rekam_medis: RekamMedisResDto[];
  user: {
    nama: string;
  };
}

export interface PatientWithFilterDate {
  patients: PatientResDto[];
  visitors: PatientResDto[];
}
