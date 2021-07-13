import type { Request, RequestHandler } from '../../types/fasitify';
import type CustModelType from '../../types/model';
import type {
  ApiKeyHeader,
  IdRequestParams,
  PostBankUserBody,
  UpdateBankUserBody,
} from '../../types/schema';
import {
  addUserBank,
  getBankData,
  getBankDetailData,
  getUserBankData,
  updateUserBank,
  deleteUserBank,
} from './service';

export const postBankUser: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: PostBankUserBody }>
> = async function postBankUser(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');

  if (!userToken) {
    res.unauthorized();

    return;
  }

  await addUserBank(userToken.userId, req.body);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};

export const getBanks: RequestHandler<Request<{ Headers: ApiKeyHeader }>> = async function getBanks(
  _,
  res,
): Promise<void> {
  const resData = await getBankData();

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const getBankDetail: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function getBankDetail(req, res): Promise<void> {
  const bankId = parseInt(req.params.id, 10) || -1;

  if (bankId <= 0) {
    res.notFound();

    return;
  }

  const resData = await getBankDetailData(bankId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const getBankUsers: RequestHandler<
  Request<{ Headers: ApiKeyHeader }>
> = async function getBankUsers(_, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');

  if (!userToken) {
    res.unauthorized();

    return;
  }

  const resData = await getUserBankData(userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const updateBankUser: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateBankUserBody }>
> = async function deleteBankUser(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');
  const userBankId = parseInt(req.params.id, 10) || -1;

  if (userBankId <= 0) {
    res.notFound();

    return;
  }

  if (!userToken) {
    res.unauthorized();

    return;
  }

  await updateUserBank(userBankId, userToken.userId, req.body);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const deleteBankUser: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function deleteBankUser(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');
  const userBankId = parseInt(req.params.id, 10) || -1;

  if (userBankId <= 0) {
    res.notFound();

    return;
  }

  if (!userToken) {
    res.unauthorized();

    return;
  }

  await deleteUserBank(userBankId, userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};
