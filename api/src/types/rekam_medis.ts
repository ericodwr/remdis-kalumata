import { User } from "./users";
import { Patient } from "./pasien";

export interface CreateRekamMedis {
  userId: string;
  pasienId: string;
  keluhan_utama: string;
  riwayat_penyakit_obat_opsional: string;
  diagnosa_penyakit: string;
  rencana_tindakan_opsional: string;
  tekanan_darah: string;
  denyut_nadi: number;
  pernapasan: number;
  suhu_tubuh: number;
  tinggi_badan: number;
  berat_badan: number;
  pemeriksaan_fisik_tambahan_opsional: string;
  nama_dokter: string;
}

export interface CreateRekamMedisWithPatient {
  userId: string;
  keluhan_utama: string;
  riwayat_penyakit_obat_opsional: string;
  diagnosa_penyakit: string;
  rencana_tindakan_opsional: string;
  tekanan_darah: string;
  denyut_nadi: number;
  pernapasan: number;
  suhu_tubuh: number;
  tinggi_badan: number;
  berat_badan: number;
  pemeriksaan_fisik_tambahan_opsional: string;
  nama_dokter: string;
}

export interface RekamMedis extends CreateRekamMedis {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  pasien: Patient;
}
