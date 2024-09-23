export interface CreateRole {
  nama: string;
}

export interface Role extends CreateRole {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
