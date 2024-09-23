export interface PoliResDto {
  id: string;
  nama: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePoliReqDto {
  nama: string;
  username: string;
  password: string;
}
