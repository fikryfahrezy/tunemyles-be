import type { Request, RequestHandler } from '../../types/fasitify';
import type CustModelType from '../../types/model';
import type {
  ApiKeyHeader,
  GetQuery,
  IdRequestParams,
  ReviewTransactionBody,
} from '../../types/schema';
import {
  processedTransactionData,
  transactionDetailData,
  completeTransaction,
  addTransactionReview,
  reviewedTransactionData,
} from './service';

export const getProcessedTransactions: RequestHandler<
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

  const resData = await processedTransactionData(userToken.userId, query);

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

  const resData = await transactionDetailData(userToken.userId, transactionId);

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

  await completeTransaction(userToken.userId, transactionId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const reviewTransaction: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: ReviewTransactionBody }>
> = async function reviewTransaction(req, res): Promise<void> {
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

  await addTransactionReview(userToken.userId, transactionId, req.body);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};

export const getReviewedTransactions: RequestHandler<
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

  const resData = await reviewedTransactionData(userToken.userId, query);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};
