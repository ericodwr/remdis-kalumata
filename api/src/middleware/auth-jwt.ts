import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import ResponseError from '../error/response-error';

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.url === '/login') {
    return next();
  }

  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token == undefined) throw new ResponseError(401, 'token not found!');

  const jwt_key: string = process.env.JWT_KEY || '';

  if (token.toString().startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token.toString(), jwt_key, (err, decoded) => {
      if (err) {
        // throw new ResponseError(401, err);
        res.status(401).send({
          message: 'Token Expired',
        });
      } else {
        // req.map((prev) => {
        //   return { ...prev, decoded };
        // });
        // req.decoded = decoded;
        next();
      }
    });
  } else {
    throw new ResponseError(401, 'please login!');
  }
};
