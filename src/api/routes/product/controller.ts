import type CustModelType from '../../types/model';
import type { Request, RequestHandler } from '../../types/fasitify';
import type { IdRequestParams, GetQuery } from '../../types/schema';
import { getProductData, productDataByCategory } from './service';

export const getProducts: RequestHandler<
  Request<{ Querystring: GetQuery }>
> = async function getProducts(_, res): Promise<void> {
  const query = this.requestContext.get<CustModelType['SearchQuery']>('query');

  if (!query) {
    res.badRequest();

    return;
  }

  const resData = await getProductData(query);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const getProductsByCategory: RequestHandler<
  Request<{ Params: IdRequestParams; Querystring: GetQuery }>
> = async function getProductsByCategory(req, res): Promise<void> {
  const categoryId = parseInt(req.params.id, 10) || -1;
  const query = this.requestContext.get<CustModelType['SearchQuery']>('query');

  if (categoryId <= 0) {
    res.notFound();

    return;
  }

  if (!query) {
    res.badRequest();

    return;
  }

  const resData = await productDataByCategory(categoryId, query);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};
