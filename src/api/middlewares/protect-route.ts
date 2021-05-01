import type { FastifyRequest, FastifyReply } from 'fastify';
import type { ApiKeyHeader } from '../types/schema';
import type CustModelType from '../types/model';
import { ErrorResponse } from '../utils/error-handler';
import { verifyJwt } from '../utils/jwt';

const userUtility: (
  who: string,
  token?: string,
) => CustModelType['UserToken'] = function userUtility(who, token) {
  if (!token) throw new ErrorResponse('forbidden', 403);

  const user = verifyJwt(token);
  if (!user) throw new ErrorResponse('forbidden', 403);
  else {
    switch (who) {
      case 'user':
        if (user.type && user.type >= 3) throw new ErrorResponse('forbidden', 403);
        break;
      case 'admin':
        if (user.type !== 2 || user.type >= 3) throw new ErrorResponse('forbidden', 403);
        break;
      case 'merchant':
        if (user.type >= 3 || user.type < 1) throw new ErrorResponse('forbidden', 403);
        break;
      default:
        throw new ErrorResponse('forbidden', 403);
    }
  }
  return user;
};

export const protect: (
  who: 'user' | 'merchant' | 'admin',
) => (req: FastifyRequest<{ Headers: ApiKeyHeader | unknown }>, res: FastifyReply) => void = (
  who,
) => (req) => {
  const token = req.headers.authorization;
  const user = userUtility(who, token);
  req.requestContext.set('user', user);
};

export const exampleProtect: (
  req: FastifyRequest<{ Headers: ApiKeyHeader | unknown }>,
  res: FastifyReply,
) => void = (req) => {
  const token = req.headers.authorization;
  if (token && token === '2') throw new ErrorResponse('forbidden', 403);
};
