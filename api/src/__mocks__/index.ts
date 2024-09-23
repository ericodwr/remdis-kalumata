import { json, NextFunction, Request, Response } from 'express';

export const mockRequest = {} as Request;

export const mockResponse = {
  send: jest.fn(),
  json: jest.fn(),
} as unknown as Response;

export const mockNextFunction = () => {};
