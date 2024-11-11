export interface CreatePatient {
  nama: string;
  NIK: string;
  pekerjaan: string;
  no_telp: string;
  usia: number;
  agama: string;
  alamat: string;
  jenis_kelamin: "laki-laki" | "perempuan";
  createdBy: string;
}

export interface Patient extends CreatePatient {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EditPatient extends CreatePatient {
  id: string;
}
