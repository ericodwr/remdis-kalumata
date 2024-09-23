import { CreatePatient } from '../patient/PatientReqDto';
import { CreateRekamMedisWithPatient } from '../remdis/RemdisReqDto';

export interface PatientRemdisReqDto {
  patient: CreatePatient;
  remdis: CreateRekamMedisWithPatient;
}
