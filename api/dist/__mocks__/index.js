"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockNextFunction = exports.mockResponse = exports.mockRequest = void 0;
exports.mockRequest = {};
exports.mockResponse = {
    send: jest.fn(),
    json: jest.fn(),
};
const mockNextFunction = () => { };
exports.mockNextFunction = mockNextFunction;
