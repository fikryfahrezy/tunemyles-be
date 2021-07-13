import type { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from 'fastify';
import type { Request } from '../../types/fasitify';
import type {
  ApiKeyHeader,
  IdRequestParams,
  GetQuery,
  TopUpBody,
  TopUpProofBody,
  UpdateTopUpStatusBody,
  UpdateWithdrawStatusBody,
  WithdrawBody,
} from '../../types/schema';
import { controllerWrapper, handlerWrapper } from '../../utils/serverfn-wrapper';
import { renameFiles } from '../../utils/file-management';
import dbQuerying from '../../middlewares/db-querying';
import schemaValidation from '../../middlewares/schema-validation';
import { protect } from '../../middlewares/protect-route';
import { requestHeaders, requestQuery, requestBody, requestParams, responses } from './schemas';
import {
  topUp,
  withdraw,
  getWallets,
  getTopUpHistories,
  getWithdrawHistories,
  getTopUpDetail,
  getWithdrawDetail,
  getAllUserTopUp,
  getAllUserWithdraw,
  uploadTopUpProof,
  updateTopUpStatus,
  updateWithdrawStatus,
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
          200: responses.wallets,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('USER'))],
    },
    controllerWrapper(getWallets),
  );

  fastify.post<Request<{ Headers: ApiKeyHeader; Body: TopUpBody }>>(
    '/topup',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        body: requestBody.topUp,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('USER'))],
    },
    controllerWrapper(topUp),
  );

  fastify.post<Request<{ Headers: ApiKeyHeader; Body: WithdrawBody }>>(
    '/withdraw',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        body: requestBody.withdraw,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('USER'))],
    },
    controllerWrapper(withdraw),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>>(
    '/topup/histories',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        querystring: requestQuery.topUpHistories,
        response: {
          200: responses.topUpHistories,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        schemaValidation,
        handlerWrapper(protect('USER')),
        handlerWrapper(dbQuerying('TOP_UP')),
      ],
    },
    controllerWrapper(getTopUpHistories),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>>(
    '/withdraw/histories',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        querystring: requestQuery.withdrawHistories,
        response: {
          200: responses.withdrawHistories,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        schemaValidation,
        handlerWrapper(protect('USER')),
        handlerWrapper(dbQuerying('WITHDRAW')),
      ],
    },
    controllerWrapper(getWithdrawHistories),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
    '/topup/:id',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        response: {
          200: responses.topUpDetail,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('USER'))],
    },
    controllerWrapper(getTopUpDetail),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
    '/withdraw/:id',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        response: {
          200: responses.withdrawDetail,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('USER'))],
    },
    controllerWrapper(getWithdrawDetail),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>>(
    '/topup/users/all',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        querystring: requestQuery.topUp,
        response: {
          200: responses.topUpHistories,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        schemaValidation,
        handlerWrapper(protect('ADMIN')),
        handlerWrapper(dbQuerying('TOP_UP')),
      ],
    },
    controllerWrapper(getAllUserTopUp),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>>(
    '/withdraw/users/all',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        querystring: requestQuery.withdraw,
        response: {
          200: responses.withdrawHistories,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        schemaValidation,
        handlerWrapper(protect('ADMIN')),
        handlerWrapper(dbQuerying('WITHDRAW')),
      ],
    },
    controllerWrapper(getAllUserWithdraw),
  );

  fastify.post<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: TopUpProofBody }>>(
    '/topup/:id/image',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.topUpProof,
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
      preHandler: [schemaValidation, handlerWrapper(protect('USER'))],
    },
    controllerWrapper(uploadTopUpProof),
  );

  fastify.patch<
    Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateTopUpStatusBody }>
  >(
    '/topup/:id/status',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.updateTopUpStatus,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(updateTopUpStatus),
  );

  fastify.patch<
    Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateWithdrawStatusBody }>
  >(
    '/withdraw/:id/status',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.updateWithdrawStatus,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(updateWithdrawStatus),
  );

  donePlugin();
};

export default routes;
