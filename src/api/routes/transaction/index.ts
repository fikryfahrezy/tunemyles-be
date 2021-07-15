import type { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from 'fastify';
import type { Request } from '../../types/fasitify';
import type {
  ApiKeyHeader,
  IdRequestParams,
  GetQuery,
  ReviewProductBody,
} from '../../types/schema';
import { controllerWrapper, handlerWrapper } from '../../utils/serverfn-wrapper';
import dbQuerying from '../../middlewares/db-querying';
import schemaValidation from '../../middlewares/schema-validation';
import { protect } from '../../middlewares/protect-route';
import { requestHeaders, requestBody, requestParams, requestQuery, responses } from './schemas';
import {
  getUserTransactions,
  getTransactionDetail,
  finishTransaction,
  reviewProduct,
  getReviewedProducts,
} from './controller';

const routes = function routes(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  donePlugin: HookHandlerDoneFunction,
): void {
  /**
   * The order of the keys is following the order of the routes in Postman
   */

  fastify.get<Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>>(
    '/',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        querystring: requestQuery.getTransactions,
        response: {
          200: responses.transactions,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        schemaValidation,
        handlerWrapper(protect('USER')),
        handlerWrapper(dbQuerying('USER_TRANSACTION')),
      ],
    },
    controllerWrapper(getUserTransactions),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
    '/:id',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        response: {
          200: responses.transactionDetail,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('USER'))],
    },
    controllerWrapper(getTransactionDetail),
  );

  fastify.patch<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
    '/:id',
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
      preHandler: [schemaValidation, handlerWrapper(protect('USER'))],
    },
    controllerWrapper(finishTransaction),
  );

  fastify.post<
    Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: ReviewProductBody }>
  >(
    '/:id',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.reviewProduct,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('USER'))],
    },
    controllerWrapper(reviewProduct),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>>(
    '/reviewed',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        querystring: requestQuery.getReviewedProducts,
        response: {
          200: responses.reviewedProducts,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        schemaValidation,
        handlerWrapper(protect('USER')),
        handlerWrapper(dbQuerying('REVIEWED_TRANSACTIONS')),
      ],
    },
    controllerWrapper(getReviewedProducts),
  );

  donePlugin();
};

export default routes;
