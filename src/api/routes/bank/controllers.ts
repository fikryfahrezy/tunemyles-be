import type { Request, RequestHandler } from '../../types/fasitify';
import type {
  ApiKeyHeader,
  IdRequestParams,
  PostBankUserBody,
  UpdateBankUserBody,
} from '../../types/schema';

export const postBankUser: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: PostBankUserBody }>
> = async function postBankUser(_, res): Promise<void> {
  await Promise.resolve('hi');

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
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const getBankDetail: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function getBankDetail(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const getBankUsers: RequestHandler<
  Request<{ Headers: ApiKeyHeader }>
> = async function getBankUsers(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const updateBankUser: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateBankUserBody }>
> = async function deleteBankUser(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const deleteBankUser: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function deleteBankUser(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};
