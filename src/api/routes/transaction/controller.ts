import type { Request, RequestHandler } from '../../types/fasitify';
import type {
  ApiKeyHeader,
  GetQuery,
  IdRequestParams,
  ReviewTransactionBody,
} from '../../types/schema';

export const getUserProcessedTransactions: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>
> = async function getUserProcessedTransactions(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const getUserTransactionDetail: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function getUserTransactionDetail(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const finishTransaction: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function finishTransaction(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const reviewTransaction: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: ReviewTransactionBody }>
> = async function reviewTransaction(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};
