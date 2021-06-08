import type { Request, RequestHandler } from '../../types/fasitify';
import type { IdRequestParams, GetQuery } from '../../types/schema';

export const getProducts: RequestHandler<
  Request<{ Querystring: GetQuery }>
> = async function getProducts(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const getProductsByCategory: RequestHandler<
  Request<{ Params: IdRequestParams; Querystring: GetQuery }>
> = async function getProductsByCategory(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};
