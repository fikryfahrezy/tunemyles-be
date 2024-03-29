import type { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from 'fastify';
import type { Request } from '../../types/fasitify';
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
import { controllerWrapper, handlerWrapper } from '../../utils/serverfn-wrapper';
import { isBodyEmpty } from '../../utils/request-validation';
import { renameFiles } from '../../utils/file-management';
import dbQuerying from '../../middlewares/db-querying';
import schemaValidation from '../../middlewares/schema-validation';
import { protect } from '../../middlewares/protect-route';
import { requestHeaders, requestQuery, requestBody, requestParams, responses } from './schemas';
import {
  updateMerchantProfile,
  updateMerchantClosetime,
  getMerchantProfile,
  postMerchantProduct,
  getMerchantProducts,
  postMerchantProductImage,
  getMerchantProductDetail,
  updateMerchantProduct,
  changeMerchantProductCover,
  updateMerchantProductStatus,
  bindMerchantProductCategory,
  deleteMerchantProductCategory,
  deleteMerchantProductImage,
  deleteMerchantProduct,
  getMerchantOrders,
  getMerchantOrderDetail,
  updateMerchantOrderStatus,
  getMerchantList,
  getMerchantProductList,
  getRandomMerchants,
  getMerchantTransactionHistories,
  getMerchantIncomeHistories,
} from './controller';

const routes = function routes(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  donePlugin: HookHandlerDoneFunction,
): void {
  /**
   * The order of the keys is following the order of the routes in Postman
   */

  fastify.get<Request<{ Headers: ApiKeyHeader }>>(
    '/',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        response: {
          200: responses.merchant,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('MERCHANT'))],
    },
    controllerWrapper(getMerchantProfile),
  );

  fastify.patch<Request<{ Headers: ApiKeyHeader; Body: UpdateMerchantProfileBody }>>(
    '/',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        body: requestBody.updateMerchantProfile,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preValidation: (req, __, done) => {
        req.body = {
          ...req.body,
          market_photo: renameFiles(req.url, req.body.market_photo),
          identity_photo: renameFiles(req.url, req.body.identity_photo),
        };

        done();
      },
      preHandler: [schemaValidation, handlerWrapper(protect('MERCHANT'))],
    },
    controllerWrapper(updateMerchantProfile),
  );

  fastify.patch<Request<{ Headers: ApiKeyHeader; Body: UpdateMerchantClosetimeBody }>>(
    '/operation-time',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        body: requestBody.updateMerchantClosetime,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('MERCHANT'))],
    },
    controllerWrapper(updateMerchantClosetime),
  );

  fastify.post<Request<{ Headers: ApiKeyHeader; Body: PostProductBody }>>(
    '/products',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        body: requestBody.postProduct,
        response: {
          200: responses.postedProduct,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preValidation: (req, res, done) => {
        if (isBodyEmpty(req.body)) {
          res.unprocessableEntity();
          return;
        }

        req.body = { ...req.body, cover: renameFiles(req.url, req.body.cover) };

        done();
      },
      preHandler: [schemaValidation, handlerWrapper(protect('MERCHANT'))],
    },
    controllerWrapper(postMerchantProduct),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>>(
    '/products',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        querystring: requestQuery.getProducts,
        response: {
          200: responses.merchantProducts,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        schemaValidation,
        handlerWrapper(protect('MERCHANT')),
        handlerWrapper(dbQuerying('PRODUCT')),
      ],
    },
    controllerWrapper(getMerchantProducts),
  );

  fastify.patch<
    Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateProductBody }>
  >(
    '/products/:id',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.updateProduct,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('MERCHANT'))],
    },
    controllerWrapper(updateMerchantProduct),
  );

  fastify.patch<
    Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: ChangeProductCoverBody }>
  >(
    '/products/:id/cover',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.changeProductCover,
        response: {
          200: responses.changedMerchantProductCover,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preValidation: (req, res, done) => {
        if (isBodyEmpty(req.body)) {
          res.unprocessableEntity();
          return;
        }

        req.body = { ...req.body, cover: renameFiles(req.url, req.body.cover) ?? req.body.cover };

        done();
      },
      preHandler: [schemaValidation, handlerWrapper(protect('MERCHANT'))],
    },
    controllerWrapper(changeMerchantProductCover),
  );

  fastify.patch<
    Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateProductStatusBody }>
  >(
    '/products/:id/status',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.updateProductStatus,
        response: {
          200: responses.updatedProductStatus,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('MERCHANT'))],
    },
    controllerWrapper(updateMerchantProductStatus),
  );

  fastify.patch<
    Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: BindProductCategoryBody }>
  >(
    '/products/:id/category',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.bindProductCategory,
        response: {
          200: responses.bindedProductCategory,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('MERCHANT'))],
    },
    controllerWrapper(bindMerchantProductCategory),
  );

  fastify.post<
    Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: PostProductImageBody }>
  >(
    '/products/:id/image',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.postProductImage,
        response: {
          200: responses.postedProductImage,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preValidation: (req, res, done) => {
        if (isBodyEmpty(req.body)) {
          res.unprocessableEntity();
          return;
        }

        req.body = { ...req.body, image: renameFiles(req.url, req.body.image) ?? req.body.image };

        done();
      },
      preHandler: [schemaValidation, handlerWrapper(protect('MERCHANT'))],
    },
    controllerWrapper(postMerchantProductImage),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
    '/products/:id',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        response: {
          200: responses.merchantSingleProduct,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('USER'))],
    },
    controllerWrapper(getMerchantProductDetail),
  );

  fastify.delete<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
    '/products/category/:id',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('MERCHANT'))],
    },
    controllerWrapper(deleteMerchantProductCategory),
  );

  fastify.delete<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
    '/products/image/:id',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('MERCHANT'))],
    },
    controllerWrapper(deleteMerchantProductImage),
  );

  fastify.delete<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
    '/products/:id',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('MERCHANT'))],
    },
    controllerWrapper(deleteMerchantProduct),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>>(
    '/orders',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        querystring: requestQuery.getOrders,
        response: {
          200: responses.merchantOrders,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        schemaValidation,
        handlerWrapper(protect('MERCHANT')),
        handlerWrapper(dbQuerying('USER_TRANSACTION')),
      ],
    },
    controllerWrapper(getMerchantOrders),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
    '/orders/:id',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        response: {
          200: responses.merchantOrderDetail,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('MERCHANT'))],
    },
    controllerWrapper(getMerchantOrderDetail),
  );

  fastify.patch<
    Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateOrderStatusBody }>
  >(
    '/orders/:id',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.updateOrderStatus,
        response: {
          200: responses.updatedOrderStatus,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('MERCHANT'))],
    },
    controllerWrapper(updateMerchantOrderStatus),
  );

  fastify.get<Request<{ Querystring: GetQuery }>>(
    '/list',
    {
      attachValidation: true,
      schema: {
        querystring: requestQuery.getMerchantList,
        response: {
          200: responses.merchantList,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(dbQuerying('MERCHANT'))],
    },
    controllerWrapper(getMerchantList),
  );

  fastify.get<Request<{ Params: IdRequestParams }>>(
    '/list/:id',
    {
      attachValidation: true,
      schema: {
        params: requestParams.id,
        response: {
          200: responses.merchantProducList,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: schemaValidation,
    },
    controllerWrapper(getMerchantProductList),
  );

  fastify.get<Request<{ Querystring: GetRandomMerchantsQuery }>>(
    '/random',
    {
      attachValidation: true,
      schema: {
        querystring: requestQuery.getRandomMerchants,
        response: {
          200: responses.merchantList,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: schemaValidation,
    },
    controllerWrapper(getRandomMerchants),
  );

  fastify.get<
    Request<{ Headers: ApiKeyHeader; Querystring: GetMerchantTransactionHistoriesQuery }>
  >(
    '/transactions',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        querystring: requestQuery.getMerchantTransactionHistories,
        response: {
          200: responses.merchantTransactions,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('MERCHANT'))],
    },
    controllerWrapper(getMerchantTransactionHistories),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Querystring: GetMerchantIncomeHistoriesQuery }>>(
    '/incomes',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        querystring: requestQuery.getMerchantIncomeHistories,
        response: {
          200: responses.merchantIncomes,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('MERCHANT'))],
    },
    controllerWrapper(getMerchantIncomeHistories),
  );

  donePlugin();
};

export default routes;
