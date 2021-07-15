import type { Request, RequestHandler } from '../../types/fasitify';
import type CustModelType from '../../types/model';
import type {
  ApiKeyHeader,
  GetQuery,
  IdRequestParams,
  ReviewProductBody,
} from '../../types/schema';
import {
  userTransactionData,
  transactionDetailData,
  completeTransaction,
  addProductReview,
  reviewedProductData,
} from './service';

export const getUserTransactions: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>
> = async function getUserProcessedTransactions(_, res): Promise<void> {
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

  const resData = await userTransactionData(userToken.userId, query);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const getTransactionDetail: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function getUserTransactionDetail(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');
  const transactionId = parseInt(req.params.id, 10) || -1;

  if (transactionId <= 0) {
    res.notFound();

    return;
  }

  if (!userToken) {
    res.unauthorized();

    return;
  }

  const resData = await transactionDetailData(transactionId, userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const finishTransaction: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function finishTransaction(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');
  const transactionId = parseInt(req.params.id, 10) || -1;

  if (transactionId <= 0) {
    res.notFound();

    return;
  }

  if (!userToken) {
    res.unauthorized();

    return;
  }

  await completeTransaction(transactionId, userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const reviewProduct: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: ReviewProductBody }>
> = async function reviewTransaction(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');
  const transactionProductId = parseInt(req.params.id, 10) || -1;

  if (transactionProductId <= 0) {
    res.notFound();

    return;
  }

  if (!userToken) {
    res.unauthorized();

    return;
  }

  await addProductReview(transactionProductId, userToken.userId, req.body);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};

export const getReviewedProducts: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>
> = async function getReviewedTransactions(_, res) {
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

  const resData = await reviewedProductData(userToken.userId, query);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};
