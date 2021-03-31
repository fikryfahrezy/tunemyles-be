import type { FastifyRequest, FastifyReply } from 'fastify';
import type { Request, RequestHandler } from '../../types/fasitify';
import type { RegisterBody, LoginBody, ApiKeyHeader } from '../../types/schema';
import { userRegistration, userLogin, userProfile } from './service';

export const register: RequestHandler<
Request<RegisterBody>
> = async function register(
  req: FastifyRequest<{ Body: RegisterBody }>,
  res: FastifyReply,
): Promise<void> {
  const { body } = req;
  const data = await userRegistration(body);

  res
    .status(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      code: 200,
      success: true,
      message: 'registration success',
      data,
    });
};

export const login: RequestHandler<Request<LoginBody>> = async function login(
  req: FastifyRequest<{ Body: LoginBody }>,
  res: FastifyReply,
): Promise<void> {
  const { body } = req;
  const data = await userLogin(body);

  res
    .status(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      code: 200,
      success: true,
      message: 'login success',
      data,
    });
};

export const getProfile: RequestHandler<
Request<unknown, unknown, unknown, ApiKeyHeader>
> = async function getProfile(
  req: FastifyRequest<{ Headers: ApiKeyHeader }>,
  res: FastifyReply,
): Promise<void> {
  const { authorization } = req.headers;
  const data = await userProfile(authorization);

  res
    .status(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      code: 200,
      success: true,
      message: 'validate success',
      data,
    });
};
