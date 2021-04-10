import jwt from 'jsonwebtoken';
import type { JwtPayload } from '../types/util';
import { ErrorResponse } from './error-handler';

const { JWT_TEMP_TOKEN, JWT_TEMP_TOKEN_EXP } = process.env;

export const issueJwt: (
  userId: number,
  utilId: number,
  userType: number
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
  token: string
) => {
  userId: number,
  utilId: number,
  type: number
} = function verifyJwt(
  token,
) {
  const jwtToken = token.split(' ')[1];
  if (!jwtToken) throw new ErrorResponse('forbidden', 403);

  const decoded = jwt.verify(jwtToken, JWT_TEMP_TOKEN as string);
  const {
    user_id: userId,
    util_id: utilId,
    type,
    exp,
  } = decoded as JwtPayload;

  if (exp < Math.floor(Date.now() / 1000)) {
    throw new ErrorResponse('forbidden', 403);
  }

  return { userId, utilId, type };
};
