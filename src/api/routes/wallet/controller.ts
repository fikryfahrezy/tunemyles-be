import type { Request, RequestHandler } from '../../types/fasitify';
import type CustModelType from '../../types/model';
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
import {
  requestTopUp,
  requestWithdraw,
  getWalletData,
  topUpHistoryData,
  withdrawHistoryData,
  topUpDetail,
  withdrawDetail,
  allUserTopUp,
  allUserWithdraw,
  topUpProof,
  changeTopUpStatus,
  changeWithdrawStatus,
} from './service';

export const getWallets: RequestHandler<
  Request<{ Headers: ApiKeyHeader }>
> = async function getWallets(_, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');

  if (!userToken) {
    res.unauthorized();

    return;
  }

  const resData = await getWalletData(userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const topUp: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: TopUpBody }>
> = async function topUp(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');

  if (!userToken) {
    res.unauthorized();

    return;
  }

  await requestTopUp(userToken.userId, req.body);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};

export const withdraw: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: WithdrawBody }>
> = async function withdraw(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');

  if (!userToken) {
    res.unauthorized();

    return;
  }

  await requestWithdraw(userToken.userId, req.body);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};

export const getTopUpHistories: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>
> = async function getTopUpHistories(_, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');
  const query = this.requestContext.get<CustModelType['SearchQuery']>('query');

  if (!query) {
    res.badRequest();

    return;
  }

  if (!userToken) {
    res.unauthorized();

    return;
  }

  const resData = await topUpHistoryData(userToken.utilId, query);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const getWithdrawHistories: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>
> = async function getWithdrawHistories(_, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');
  const query = this.requestContext.get<CustModelType['SearchQuery']>('query');

  if (!query) {
    res.badRequest();

    return;
  }

  if (!userToken) {
    res.unauthorized();

    return;
  }

  const resData = await withdrawHistoryData(userToken.userId, query);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const getTopUpDetail: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function getTopUpDetail(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');
  const topUpId = parseInt(req.params.id, 10) || -1;

  if (topUpId <= 0) {
    res.notFound();

    return;
  }

  if (!userToken) {
    res.unauthorized();

    return;
  }

  const resData = await topUpDetail(userToken.userId, topUpId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const getWithdrawDetail: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function getWithdrawDetail(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');
  const withdrawId = parseInt(req.params.id, 10) || -1;

  if (withdrawId <= 0) {
    res.notFound();

    return;
  }

  if (!userToken) {
    res.unauthorized();

    return;
  }

  const resData = await withdrawDetail(userToken.userId, withdrawId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const getAllUserTopUp: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>
> = async function getAllUserTopUp(_, res): Promise<void> {
  const query = this.requestContext.get<CustModelType['SearchQuery']>('query');

  if (!query) {
    res.badRequest();

    return;
  }

  const resData = await allUserTopUp(query);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const getAllUserWithdraw: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>
> = async function getAllUserWithdraw(_, res): Promise<void> {
  const query = this.requestContext.get<CustModelType['SearchQuery']>('query');

  if (!query) {
    res.badRequest();

    return;
  }

  const resData = await allUserWithdraw(query);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const uploadTopUpProof: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: TopUpProofBody }>
> = async function uploadTopUpProof(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');
  const topUpId = parseInt(req.params.id, 10) || -1;

  if (topUpId <= 0) {
    res.notFound();

    return;
  }

  if (!userToken) {
    res.unauthorized();

    return;
  }

  await topUpProof(topUpId, userToken.userId, req.body);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};

export const updateTopUpStatus: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateTopUpStatusBody }>
> = async function updateTopUpStaus(req, res): Promise<void> {
  const topUpId = parseInt(req.params.id, 10) || -1;

  if (topUpId <= 0) {
    res.notFound();

    return;
  }

  await changeTopUpStatus(topUpId, req.body);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const updateWithdrawStatus: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateWithdrawStatusBody }>
> = async function updateWithdrawStatus(req, res): Promise<void> {
  const withdrawId = parseInt(req.params.id, 10) || -1;

  if (withdrawId <= 0) {
    res.notFound();

    return;
  }

  await changeWithdrawStatus(withdrawId, req.body);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};
