import type { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from 'fastify';
import type { Request } from '../../types/fasitify';
import type {
  ApiKeyHeader,
  GetQuery,
  ActivateMerchantBody,
  UpdateMerchantProfileBody,
  UpdateMerchantClosetimeBody,
  PostProductBody,
  IdRequestParams,
  UpdateProductBody,
  UpdateProductCoverBody,
  UpdateProductStatusBody,
  BindProductCategoryBody,
  PostProductImageBody,
  DeleteProductCategoryParams,
  UpdateOrderStatusBody,
  GetRandomMerchantsQuery,
  GetMerchantTransactionHistoriesQuery,
  GetMerchantIncomeHistoriesQuery,
} from '../../types/schema';
import { controllerWrapper, handlerWrapper } from '../../utils/serverfn-wrapper';
import { schemaValidationError } from '../../utils/error-handler';
import { renameFiles } from '../../utils/file-management';
import { protect } from '../../middlewares/protect-route';
import dbQuerying from '../../middlewares/db-querying';
import { requestHeaders, requestQuery, requestBody, requestParams } from './schemas';

const routes = function routes(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  donePlugin: HookHandlerDoneFunction,
): void {
  /**
   * The order of the keys is following the order of the routes in Postman
   */

  fastify.post<Request<{ Headers: ApiKeyHeader; Body: ActivateMerchantBody }>>(
    '/activate',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        body: requestBody.activateMerchant,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preValidation: (req, __, done) => {
        req.body = {
          ...req.body,
          market_photo: renameFiles(req.url, req.body.market_photo) ?? req.body.market_photo,
          identity_photo: renameFiles(req.url, req.body.identity_photo) ?? req.body.identity_photo,
        };

        done();
      },
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('USER')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(201)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
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
          market_photo: renameFiles(req.url, req.body.market_photo) ?? req.body.market_photo,
        };

        done();
      },
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('MERCHANT')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
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
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('MERCHANT')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader }>>(
    '/',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('MERCHANT')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
  );

  fastify.post<Request<{ Headers: ApiKeyHeader; Body: PostProductBody }>>(
    '/products',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        body: requestBody.postProduct,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preValidation: (req, __, done) => {
        req.body = { ...req.body, cover: renameFiles(req.url, req.body.cover) };

        done();
      },
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('MERCHANT')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>>(
    '/products',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        querystring: requestQuery.getProducts,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('MERCHANT')),
        handlerWrapper(dbQuerying('PRODUCT')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
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
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('MERCHANT')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
  );

  fastify.patch<
    Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateProductCoverBody }>
  >(
    '/products/:id/cover',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.updateProductCover,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preValidation: (req, __, done) => {
        req.body = { ...req.body, cover: renameFiles(req.url, req.body.cover) ?? req.body.cover };

        done();
      },
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('MERCHANT')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
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
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('MERCHANT')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
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
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('MERCHANT')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
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
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('USER')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
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
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preValidation: (req, __, done) => {
        req.body = { ...req.body, image: renameFiles(req.url, req.body.image) ?? req.body.image };

        done();
      },
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('MERCHANT')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
  );

  fastify.delete<Request<{ Headers: ApiKeyHeader; Params: DeleteProductCategoryParams }>>(
    '/products/:productId/category/:categoryId',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.deleteProductCategory,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('MERCHANT')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
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
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('MERCHANT')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
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
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('MERCHANT')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>>(
    '/orders',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        querystring: requestQuery.getOrders,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('MERCHANT')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
    '/orders/:id',
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
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('MERCHANT')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
  );

  fastify.patch<
    Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateOrderStatusBody }>
  >(
    '/',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.updateOrderStatus,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('MERCHANT')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>>(
    '/list',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        querystring: requestQuery.getMerchantList,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('MERCHANT')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
    '/list/:id',
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
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('MERCHANT')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Querystring: GetRandomMerchantsQuery }>>(
    '/random',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        querystring: requestQuery.getRandomMerchants,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('MERCHANT')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
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
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('MERCHANT')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Querystring: GetMerchantIncomeHistoriesQuery }>>(
    '/incomes',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        querystring: requestQuery.getMerchantIncomeHistories,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('MERCHANT')),
      ],
    },
    controllerWrapper((__, res) => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: true });
    }),
  );

  donePlugin();
};

export default routes;
