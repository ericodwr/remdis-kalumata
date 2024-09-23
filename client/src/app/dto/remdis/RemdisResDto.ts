import { CreateRekamMedis } from './RemdisReqDto';

export interface RekamMedisResDto extends CreateRekamMedis {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
