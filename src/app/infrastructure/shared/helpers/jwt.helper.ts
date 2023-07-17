import { config } from '@config/index';
import { Unauthorized } from '@middlewares/err/handleErrors.err';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '30d' });
}

export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, config.JWT_SECRET) as object;
  } catch (error) {
    throw new Unauthorized('Not authorized, token failed');
  }
}
