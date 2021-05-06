import jwt from 'jsonwebtoken';
import type { JwtPayload } from '../types/util';
import type CustModelType from '../types/model';
import { ErrorResponse } from './error-handler';

const { JWT_TEMP_TOKEN, JWT_TEMP_TOKEN_EXP } = process.env;

export const issueJwt: (
  userId: number,
  utilId: number,
  userType: number,
) => string = function issueJwt(userId, utilId, userType) {
  const token = jwt.sign(
    {
      user_id: userId,
      util_id: utilId,
      type: userType,
    },
    JWT_TEMP_TOKEN as string,
    { expiresIn: JWT_TEMP_TOKEN_EXP },
  );

  return token;
};

export const verifyJwt: (
  token: string,
) => {
  userId: number;
  utilId: number;
  type: number;
} = function verifyJwt(token) {
  const tokenPrefix = 'Bearer ';
  if (!token.startsWith(tokenPrefix)) {
    throw new ErrorResponse('forbidden', 403);
  }

  const jwtToken = token.slice(tokenPrefix.length);
  if (!jwtToken) throw new ErrorResponse('forbidden', 403);

  const decoded = jwt.verify(jwtToken, JWT_TEMP_TOKEN as string);
  const { user_id: userId, util_id: utilId, type, exp } = decoded as JwtPayload;

  if (exp < Math.floor(Date.now() / 1000)) {
    throw new ErrorResponse('forbidden', 403);
  }

  return { userId, utilId, type };
};

export const verifyToken: (
  who: 'USER' | 'ADMIN' | 'MERCHANT',
  token?: string,
) => CustModelType['UserToken'] = function verifyToken(who, token) {
  if (!token) throw new ErrorResponse('forbidden', 403);

  const user = verifyJwt(token);
  if (!user) throw new ErrorResponse('forbidden', 403);
  else {
    switch (who) {
      case 'USER':
        if (user.type >= 3) throw new ErrorResponse('forbidden', 403);
        break;
      case 'ADMIN':
        if (user.type !== 2 || user.type >= 3) throw new ErrorResponse('forbidden', 403);
        break;
      case 'MERCHANT':
        if (user.type >= 3 || user.type < 1) throw new ErrorResponse('forbidden', 403);
        break;
      default:
        throw new ErrorResponse('forbidden', 403);
    }
  }
  return user;
};
