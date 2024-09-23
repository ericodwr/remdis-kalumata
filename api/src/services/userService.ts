import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User, CreateUser, LoginUser } from '../types/users';
import { prisma } from '../application/database';
import {
  validateUserCreate,
  validateUserLogin,
} from '../validations/userValidation';
import ResponseError from '../error/response-error';

export const getAll = async () => {
  const allUser = await prisma.users.findMany({
    include: {
      role: true,
    },
  });

  return {
    data: allUser,
  };
};

export const create = async (data: CreateUser) => {
  validateUserCreate(data);

  const hashPassword = await bycrypt.hash(data.password, 15);

  data.password = hashPassword;

  const newUser = await prisma.users.create({
    data: {
      ...data,
    },
  });

  return {
    message: 'Create user success!',
    data: newUser,
  };
};

export const login = async (data: LoginUser) => {
  validateUserLogin(data);

  const user: User | null = await prisma.users.findUnique({
    where: {
      username: data.username,
    },
    include: {
      role: true,
    },
  });

  if (!user) throw new ResponseError(403, 'username or password invalid!');

  const isPasswordValid = await bycrypt.compare(data.password, user.password);

  if (!isPasswordValid)
    throw new ResponseError(403, 'username or password invalid!');

  const jwt_key: string = process.env.JWT_KEY || '';

  const token = jwt.sign(
    { username: data.username, role: user.role.nama },
    jwt_key,
    {
      expiresIn: '24hr',
    },
  );

  const [newUser] = await prisma.$transaction([
    prisma.users.update({
      where: {
        username: data.username,
      },
      data: {
        token,
        updatedAt: new Date(),
      },
      include: {
        role: true,
      },
    }),
  ]);

  return {
    id: newUser.id,
    username: newUser.username,
    nama: newUser.nama,
    token: newUser.token,
    role: newUser.role.nama,
  };
};
