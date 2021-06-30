import type { Request, RequestHandler } from '../../types/fasitify';
import type CustModelType from '../../types/model';
import type {
  ApiKeyHeader,
  VerifyTokenParams,
  RegisterBody,
  ActivateMerchantBody,
  LoginBody,
  UpdateProfileBody,
  ForgotPasswordBody,
  ResetPasswordBody,
} from '../../types/schema';
import {
  userRegistration,
  merchantRegistration,
  userLogin,
  userProfile,
  updateUserProfile,
  verifyUserToken,
  resetUserPassword,
  forgotUserPassword,
  makeUserAdmin,
  bannedUser,
} from './service';

export const register: RequestHandler<Request<{ Body: RegisterBody }>> = async function register(
  req,
  res,
): Promise<void> {
  const resData = await userRegistration(req.body);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'registration success',
    data: resData,
  });
};

export const activateMerchant: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: ActivateMerchantBody }>
> = async function activateMerchant(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');

  if (!userToken) {
    res.unauthorized();

    return;
  }

  const resData = await merchantRegistration(req.body, userToken);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const login: RequestHandler<Request<{ Body: LoginBody }>> = async function login(
  req,
  res,
): Promise<void> {
  const resData = await userLogin(req.body);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'login success',
    data: resData,
  });
};

export const getProfile: RequestHandler<
  Request<{ Headers: ApiKeyHeader }>
> = async function getProfile(_, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');

  if (!userToken) {
    res.unauthorized();

    return;
  }

  const resData = await userProfile(userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'validate success',
    data: resData,
  });
};

export const updateProfile: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: UpdateProfileBody }>
> = async function updateProfile(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');

  if (!userToken) {
    res.unauthorized();

    return;
  }

  await updateUserProfile(userToken.userId, req.body);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'successfully updated',
  });
};

export const forgotPassword: RequestHandler<
  Request<{ Body: ForgotPasswordBody }>
> = async function forgotPassword(req, res): Promise<void> {
  const resData = await forgotUserPassword(req.body);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'request sent',
    data: resData,
  });
};

export const verifyToken: RequestHandler<
  Request<{ Params: VerifyTokenParams }>
> = async function verifyToken(req, res): Promise<void> {
  const resData = await verifyUserToken(req.params);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'verified token success',
    data: resData,
  });
};

export const resetPassword: RequestHandler<
  Request<{ Body: ResetPasswordBody }>
> = async function resetPassword(req, res): Promise<void> {
  await resetUserPassword(req.body);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'password successfully changed',
  });
};

export const createAdmin: RequestHandler<Request> = async function createAdmin(
  _,
  res,
): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');

  if (!userToken) {
    res.unauthorized();

    return;
  }

  const token = await makeUserAdmin(userToken.userId, userToken.utilId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success make the user as an admin',
    data: token,
  });
};

export const banned: RequestHandler<Request> = async function banned(_, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');

  if (!userToken) {
    res.unauthorized();

    return;
  }

  await bannedUser(userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'successful banning user',
  });
};
