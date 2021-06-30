import type { Request, RequestHandler } from '../../types/fasitify';
import type CustModelType from '../../types/model';
import type {
  ApiKeyHeader,
  IdRequestParams,
  GetQuery,
  UpdateMerchantProfileBody,
  UpdateMerchantClosetimeBody,
  PostProductBody,
  UpdateProductBody,
  ChangeProductCoverBody,
  UpdateProductStatusBody,
  BindProductCategoryBody,
  PostProductImageBody,
  UpdateOrderStatusBody,
  GetRandomMerchantsQuery,
  GetMerchantTransactionHistoriesQuery,
  GetMerchantIncomeHistoriesQuery,
} from '../../types/schema';
import {
  merhantProfile,
  updateMerchantData,
  updateMerchantOperation,
  postProductData,
  getProductData,
  postProductImage,
  getProductDetail,
  updateProductData,
  changeProductCover,
  updateProductStatus,
  bindProductCategory,
  removeProductCategory,
  removeProductImage,
  deleteProduct,
  getOrderData,
  getOrderDetail,
  updateOrderStatus,
  getMerchantData,
  getMerchantProductData,
  getRandomMerchantData,
  getTransactionHistories,
  getIncomeHistories,
} from './service';

export const getMerchantProfile: RequestHandler<
  Request<{ Headers: ApiKeyHeader }>
> = async function getMerchantProfile(_, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');

  if (!userToken) {
    res.unauthorized();

    return;
  }

  const resData = await merhantProfile(userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const updateMerchantProfile: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: UpdateMerchantProfileBody }>
> = async function updateMerchantProfile(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');

  if (!userToken) {
    res.unauthorized();

    return;
  }

  await updateMerchantData(req.body, userToken.userId);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};

export const updateMerchantClosetime: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: UpdateMerchantClosetimeBody }>
> = async function updateMerchantClosetime(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');

  if (!userToken) {
    res.unauthorized();

    return;
  }

  await updateMerchantOperation(req.body, userToken.utilId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const postMerchantProduct: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: PostProductBody }>
> = async function postMerchantProduct(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');

  if (!userToken) {
    res.unauthorized();

    return;
  }

  const resData = await postProductData(req.body, userToken.userId);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const getMerchantProducts: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>
> = async function getMerchantProducts(_, res): Promise<void> {
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

  const resData = await getProductData(query, userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const postMerchantProductImage: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: PostProductImageBody }>
> = async function postMerchantProductImage(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');
  const productId = parseInt(req.params.id, 10) || -1;

  if (productId <= 0) {
    res.notFound();

    return;
  }

  if (!userToken) {
    res.unauthorized();

    return;
  }

  const restData = await postProductImage(productId, req.body, userToken.userId);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
    data: restData,
  });
};

export const getMerchantProductDetail: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function getMerchantProductDetail(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');
  const productId = parseInt(req.params.id, 10) || -1;

  if (productId <= 0) {
    res.notFound();

    return;
  }

  if (!userToken) {
    res.unauthorized();

    return;
  }

  const resData = await getProductDetail(productId, userToken.utilId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const updateMerchantProduct: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateProductBody }>
> = async function updateMerchantProduct(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');
  const productId = parseInt(req.params.id, 10) || -1;

  if (productId <= 0) {
    res.notFound();

    return;
  }

  if (!userToken) {
    res.unauthorized();

    return;
  }

  await updateProductData(productId, req.body, userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const changeMerchantProductCover: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: ChangeProductCoverBody }>
> = async function updateMerchantProductCover(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');
  const productId = parseInt(req.params.id, 10) || -1;

  if (productId <= 0) {
    res.notFound();

    return;
  }

  if (!userToken) {
    res.unauthorized();

    return;
  }

  const resData = await changeProductCover(productId, req.body, userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const updateMerchantProductStatus: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateProductStatusBody }>
> = async function updateMerchantProductStatus(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');
  const productId = parseInt(req.params.id, 10) || -1;

  if (productId <= 0) {
    res.notFound();

    return;
  }

  if (!userToken) {
    res.unauthorized();

    return;
  }

  const resData = await updateProductStatus(productId, req.body, userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const bindMerchantProductCategory: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: BindProductCategoryBody }>
> = async function bindMerchantProductCategory(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');
  const productId = parseInt(req.params.id, 10) || -1;

  if (productId <= 0) {
    res.notFound();

    return;
  }

  if (!userToken) {
    res.unauthorized();

    return;
  }

  const resData = await bindProductCategory(productId, req.body, userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const deleteMerchantProductCategory: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function deleteMerchantProductCategory(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');
  const categoryId = parseInt(req.params.id, 10) || -1;

  if (categoryId <= 0) {
    res.notFound();

    return;
  }

  if (!userToken) {
    res.unauthorized();

    return;
  }

  await removeProductCategory(categoryId, userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const deleteMerchantProductImage: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function deleteMerchantProductImage(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');
  const imageId = parseInt(req.params.id, 10) || -1;

  if (imageId <= 0) {
    res.notFound();

    return;
  }

  if (!userToken) {
    res.unauthorized();

    return;
  }

  await removeProductImage(imageId, userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const deleteMerchantProduct: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function deleteMerchantProduct(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');
  const productId = parseInt(req.params.id, 10) || -1;

  if (productId <= 0) {
    res.notFound();

    return;
  }

  if (!userToken) {
    res.unauthorized();

    return;
  }

  await deleteProduct(productId, userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const getMerchantOrders: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>
> = async function getMerchantOrders(_, res): Promise<void> {
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

  const resData = await getOrderData(query, userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const getMerchantOrderDetail: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function getMerchantOrderDetail(req, res): Promise<void> {
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

  const resData = await getOrderDetail(transactionId, userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const updateMerchantOrderStatus: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateOrderStatusBody }>
> = async function updateMerchantOrderStatus(req, res): Promise<void> {
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

  const resData = await updateOrderStatus(transactionId, req.body, userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const getMerchantList: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>
> = async function getMerchantList(_, res): Promise<void> {
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

  const resData = await getMerchantData(query);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const getMerchantProductList: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function getMerchantProductList(req, res): Promise<void> {
  const merchantId = parseInt(req.params.id, 10) || -1;

  if (merchantId <= 0) {
    res.notFound();

    return;
  }

  const resData = await getMerchantProductData(merchantId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const getRandomMerchants: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetRandomMerchantsQuery }>
> = async function getRandomMerchants(req, res): Promise<void> {
  const limit = parseInt(req.query.limit, 10) || 10;
  const resData = await getRandomMerchantData(limit);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const getMerchantTransactionHistories: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetMerchantTransactionHistoriesQuery }>
> = async function getMerchantTransactionHistories(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');

  if (!userToken) {
    res.unauthorized();

    return;
  }
  const dateObj = new Date();
  const date =
    req.query.date ??
    `${dateObj.getUTCFullYear()}-${dateObj.getUTCMonth() + 1}-${dateObj.getUTCDate()}`;
  const resData = await getTransactionHistories(date, userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const getMerchantIncomeHistories: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetMerchantIncomeHistoriesQuery }>
> = async function getMerchantIncomeHistories(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');

  if (!userToken) {
    res.unauthorized();

    return;
  }

  const year = parseInt(req.query.year, 10) || new Date().getUTCFullYear();
  const resData = await getIncomeHistories(year, userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};
