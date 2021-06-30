import type { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from 'fastify';
import type { Request } from '../../types/fasitify';
import type {
  ApiKeyHeader,
  IdRequestParams,
  PostBankUserBody,
  UpdateBankUserBody,
} from '../../types/schema';
import { controllerWrapper, handlerWrapper } from '../../utils/serverfn-wrapper';
import schemaValidation from '../../middlewares/schema-validation';
import { protect } from '../../middlewares/protect-route';
import { requestHeaders, requestBody, requestParams } from './schemas';
import {
  postBankUser,
  getBanks,
  getBankDetail,
  getBankUsers,
  updateBankUser,
  deleteBankUser,
} from './controllers';

const routes = function routes(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  donePlugin: HookHandlerDoneFunction,
): void {
  /**
   * The order of the keys is following the order of the routes in Postman
   */

  fastify.post<Request<{ Headers: ApiKeyHeader; Body: PostBankUserBody }>>(
    '/users',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        body: requestBody.postBankUser,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('USER'))],
    },
    controllerWrapper(postBankUser),
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
      preHandler: [schemaValidation, handlerWrapper(protect('USER'))],
    },
    controllerWrapper(getBanks),
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
    controllerWrapper(getBankDetail),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader }>>(
    '/users/get',
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
      preHandler: [schemaValidation, handlerWrapper(protect('USER'))],
    },
    controllerWrapper(getBankUsers),
  );

  fastify.patch<
    Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateBankUserBody }>
  >(
    '/users/:id',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.updateBankUser,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('USER'))],
    },
    controllerWrapper(updateBankUser),
  );

  fastify.delete<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
    '/users/:id',
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
    controllerWrapper(deleteBankUser),
  );

  donePlugin();
};

export default routes;
