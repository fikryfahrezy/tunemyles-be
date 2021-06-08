import type { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from 'fastify';
import type { Request } from '../../types/fasitify';
import type {
  ApiKeyHeader,
  IdRequestParams,
  GetQuery,
  ReviewTransactionBody,
} from '../../types/schema';
import { controllerWrapper, handlerWrapper } from '../../utils/serverfn-wrapper';
import { protect } from '../../middlewares/protect-route';
import dbQuerying from '../../middlewares/db-querying';
import schemaValidation from '../../middlewares/schema-validation';
import { requestHeaders, requestBody, requestParams, requestQuery } from './schemas';
import {
  getUserProcessedTransactions,
  getUserTransactionDetail,
  finishTransaction,
  reviewTransaction,
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
        querystring: requestQuery.getTransaction,
        response: {
          200: { $ref: '#ApiResponse' },
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
    controllerWrapper(getUserProcessedTransactions),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
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
    controllerWrapper(getUserTransactionDetail),
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
    Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: ReviewTransactionBody }>
  >(
    '/:id',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.reviewTransaction,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('USER'))],
    },
    controllerWrapper(reviewTransaction),
  );

  donePlugin();
};

export default routes;
