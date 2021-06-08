import type { Request, RequestHandler } from '../../types/fasitify';
import type {
  ApiKeyHeader,
  IdRequestParams,
  GetQuery,
  TopUpBody,
  TopUpProofBody,
  UpdateTopUpStatusBody,
  UpdateWithdrawStatusBody,
  WithdrawBody,
} from '../../types/schema';

export const topUp: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: TopUpBody }>
> = async function topUp(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};

export const withdraw: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: WithdrawBody }>
> = async function withdraw(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};

export const getWallets: RequestHandler<
  Request<{ Headers: ApiKeyHeader }>
> = async function getWallets(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const getTopUpHistories: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>
> = async function getTopUpHistories(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const getWithdrawHistories: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>
> = async function getWithdrawHistories(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const getTopUpDetail: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function getTopUpDetail(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const getWithdrawDetail: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function getWithdrawDetail(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const getAllUserTopUp: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>
> = async function getAllUserTopUp(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const getAllUserWithdraw: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>
> = async function getAllUserWithdraw(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const uploadTopUpProof: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: TopUpProofBody }>
> = async function uploadTopUpProof(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};

export const updateTopUpStatus: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateTopUpStatusBody }>
> = async function updateTopUpStaus(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const updateWithdrawStatus: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateWithdrawStatusBody }>
> = async function updateWithdrawStatus(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};
