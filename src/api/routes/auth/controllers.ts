import type { FastifyRequest, FastifyReply } from 'fastify';
import type { Request, RequestHandler } from '../../types/fasitify';
import type {
  RegisterBody,
  LoginBody,
  ApiKeyHeader,
  UpdateProfileBody,
} from '../../types/schema';
import type CustModelType from '../../types/model';
import {
  userRegistration,
  userLogin,
  userProfile,
  updateUserProfile,
  verifyUserToken,
  resetUserPassword,
  forgotUserPassword,
} from './service';

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
  _: FastifyRequest<{ Headers: ApiKeyHeader }>,
  res: FastifyReply,
): Promise<void> {
  const { utilId } = this.requestContext.get(
    'user',
  ) as CustModelType['UserUtility'];
  const data = await userProfile(utilId);

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

export const updateProfile: RequestHandler<
Request<UpdateProfileBody, unknown, unknown, ApiKeyHeader>
> = async function updateProfile(
  req: FastifyRequest<{ Body: UpdateProfileBody; Headers: ApiKeyHeader }>,
  res: FastifyReply,
): Promise<void> {
  const { utilId } = this.requestContext.get(
    'user',
  ) as CustModelType['UserUtility'];
  const data = await updateUserProfile(utilId);

  res
    .status(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      code: 200,
      success: true,
      message: 'message',
      data,
    });
};

export const forgotPassword: RequestHandler<Request> = async function forgotPassword(
  _: FastifyRequest,
  res: FastifyReply,
): Promise<void> {
  const data = await forgotUserPassword(1);

  res
    .status(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      code: 200,
      success: true,
      message: 'message',
      data,
    });
};

export const verifyToken: RequestHandler<Request> = async function verifyToken(
  _: FastifyRequest,
  res: FastifyReply,
): Promise<void> {
  const data = await verifyUserToken(1);

  res
    .status(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      code: 200,
      success: true,
      message: 'message',
      data,
    });
};

export const resetPassword: RequestHandler<Request> = async function resetPassword(
  _: FastifyRequest,
  res: FastifyReply,
): Promise<void> {
  const data = await resetUserPassword(1);

  res
    .status(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      code: 200,
      success: true,
      message: 'message',
      data,
    });
};
