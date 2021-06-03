import type { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from 'fastify';
import type { Request } from '../../types/fasitify';
import type {
  ApiKeyHeader,
  GetQuery,
  IdRequestParams,
  PostBankBody,
  UpdateBankBody,
  UpdateBankLogoBody,
  UpdateBankDetailBody,
  PostBankStepBody,
  PostCategoryBody,
  UpdateCategoryBody,
  PostMediaBody,
  PostWalletBody,
  UpdateWalletBody,
  UpdateWalletLogoBody,
  PostFaqBody,
  UpdateFaqBody,
} from '../../types/schema';
import { controllerWrapper, handlerWrapper } from '../../utils/serverfn-wrapper';
import { schemaValidationError } from '../../utils/error-handler';
import { renameFiles } from '../../utils/file-management';
import { protect } from '../../middlewares/protect-route';
import dbQuerying from '../../middlewares/db-querying';
import { requestHeaders, requestQuery, requestBody, requestParams, responses } from './schemas';

const routes = function routes(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  donePlugin: HookHandlerDoneFunction,
): void {
  fastify.get<Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>>(
    '/banks',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        querystring: requestQuery.getBanks,
        response: {
          200: responses.banks,
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
        handlerWrapper(dbQuerying('BANK')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.post<Request<{ Headers: ApiKeyHeader; Body: PostBankBody }>>(
    '/banks',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        body: requestBody.postBank,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preValidation: (req, __, done) => {
        req.body = { ...req.body, logo: renameFiles(req.url, req.body.logo) };
        done();
      },
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('ADMIN')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
    '/banks/:id',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        response: {
          200: responses.bankDetail,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('ADMIN')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.patch<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateBankBody }>>(
    '/banks/:id',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.updateBank,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        (req, res, done) => {
          const validation = req.validationError;
          if (validation) schemaValidationError(validation, res);
          done();
        },
        handlerWrapper(protect('ADMIN')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.delete<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
    '/banks/:id',
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
        handlerWrapper(protect('ADMIN')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.patch<
    Request<{ Header: ApiKeyHeader; Params: IdRequestParams; Body: UpdateBankLogoBody }>
  >(
    '/banks/:id/logo',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.updateBankLogo,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preValidation: (req, __, done) => {
        req.body = { ...req.body, logo: renameFiles(req.url, req.body.logo) ?? req.body.logo };
        done();
      },
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('ADMIN')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.patch<
    Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateBankDetailBody }>
  >(
    '/banks/:id/detail',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.updateBankdetail,
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
        handlerWrapper(protect('ADMIN')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.post<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: PostBankStepBody }>>(
    '/banks/:id/steps',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.postBankStep,
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
        handlerWrapper(protect('ADMIN')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.delete<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
    '/banks/steps/:id',
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
        handlerWrapper(protect('ADMIN')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>>(
    '/categories',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        querystring: requestQuery.getCategories,
        response: {
          200: responses.categories,
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
        handlerWrapper(dbQuerying('CATEGORY')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.post<Request<{ Headers: ApiKeyHeader; Body: PostCategoryBody }>>(
    '/categories',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        body: requestBody.postCategory,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preValidation: (req, __, done) => {
        req.body = { ...req.body, icon: renameFiles(req.url, req.body.icon) ?? req.body.icon };
        done();
      },
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('ADMIN')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.patch<
    Request<{ Header: ApiKeyHeader; Params: IdRequestParams; Body: UpdateCategoryBody }>
  >(
    '/categories/:id',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.updateCategory,
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
        handlerWrapper(protect('ADMIN')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.delete<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
    '/categories/:id',
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
        handlerWrapper(protect('ADMIN')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.patch<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
    '/categories/:id/icon',
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
        handlerWrapper(protect('ADMIN')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>>(
    '/medias',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        querystring: requestQuery.getMedias,
        response: {
          200: responses.medias,
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
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.post<Request<{ Headers: ApiKeyHeader; Body: PostMediaBody }>>(
    '/medias',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        body: requestBody.postMedia,
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
        handlerWrapper(protect('ADMIN')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.patch<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: PostMediaBody }>>(
    '/medias/:id',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.postMedia,
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
        handlerWrapper(protect('ADMIN')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.delete<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
    '/medias/:id',
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
        handlerWrapper(protect('ADMIN')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>>(
    '/wallets',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        querystring: requestQuery.getWallets,
        response: {
          200: responses.wallets,
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
        handlerWrapper(dbQuerying('WALLET')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.post<Request<{ Headers: ApiKeyHeader; Body: PostWalletBody }>>(
    '/wallets',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        body: requestBody.postWallet,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preValidation: (req, __, done) => {
        req.body = { ...req.body, logo: renameFiles(req.url, req.body.logo) ?? req.body.logo };
        done();
      },
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('ADMIN')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.patch<
    Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateWalletBody }>
  >(
    '/wallets/:id',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.updateWallet,
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
        handlerWrapper(protect('ADMIN')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.delete<Request<{ Header: ApiKeyHeader; Params: IdRequestParams }>>(
    '/wallets/:id',
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
        handlerWrapper(protect('ADMIN')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.patch<
    Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateWalletLogoBody }>
  >(
    '/wallets/:id/logo',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.updateWalletLogo,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preValidation: (req, __, done) => {
        req.body = { ...req.body, logo: renameFiles(req.url, req.body.logo) ?? req.body.logo };
        done();
      },
      preHandler: [
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('ADMIN')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.get<Request>(
    '/faqs',
    {
      attachValidation: true,
      schema: {
        response: {
          200: responses.faqs,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.post<Request<{ Header: ApiKeyHeader; Body: PostFaqBody }>>(
    '/faqs',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        body: requestBody.postFaq,
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
        handlerWrapper(protect('ADMIN')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.delete<Request<{ Header: ApiKeyHeader; Params: IdRequestParams }>>(
    '/faqs/:id',
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
        handlerWrapper(protect('ADMIN')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  fastify.patch<Request<{ Header: ApiKeyHeader; Params: IdRequestParams; Body: UpdateFaqBody }>>(
    '/faqs/:id',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.updateFaq,
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
        handlerWrapper(protect('ADMIN')),
      ],
    },
    controllerWrapper((__, res) => {
      res.header('Content-Type', 'application/json; charset=utf-8').send({ success: true });
    }),
  );

  donePlugin();
};

export default routes;
