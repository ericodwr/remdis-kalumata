"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_error_1 = __importDefault(require("../error/response-error"));
exports.default = (req, res, next) => {
    if (req.url === '/login') {
        return next();
    }
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token == undefined)
        throw new response_error_1.default(401, 'token not found!');
    const jwt_key = process.env.JWT_KEY || '';
    if (token.toString().startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    if (token) {
        jsonwebtoken_1.default.verify(token.toString(), jwt_key, (err, decoded) => {
            if (err) {
                // throw new ResponseError(401, err);
                res.status(401).send({
                    message: 'Token Expired',
                });
            }
            else {
                // req.map((prev) => {
                //   return { ...prev, decoded };
                // });
                // req.decoded = decoded;
                next();
            }
        });
    }
    else {
        throw new response_error_1.default(401, 'please login!');
    }
};
