import type { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from 'fastify';
import type { Request } from '../../types/fasitify';
import type {
  ApiKeyHeader,
  IdRequestParams,
  GetQuery,
  PostBankBody,
  UpdateBankBody,
  UpdateBankDetailBody,
  ChangeBankLogoBody,
  PostBankStepBody,
  PostCategoryBody,
  UpdateCategoryBody,
  ChangeCategoryIconBody,
  PostMediaBody,
  PostWalletBody,
  UpdateWalletBody,
  UpdateWalletLogoBody,
  PostFaqBody,
  UpdateFaqBody,
} from '../../types/schema';
import { controllerWrapper, handlerWrapper } from '../../utils/serverfn-wrapper';
import { isBodyEmpty } from '../../utils/request-validation';
import { renameFiles } from '../../utils/file-management';
import { protect } from '../../middlewares/protect-route';
import dbQuerying from '../../middlewares/db-querying';
import schemaValidation from '../../middlewares/schema-validation';
import { requestHeaders, requestQuery, requestBody, requestParams, responses } from './schemas';
import {
  postMasterBank,
  getMasterBanks,
  getMasterBankDetail,
  updateMasterBank,
  updateMasterBankAccount,
  changeMasterBankLogo,
  postMasterBankStep,
  deleteMasterBankStep,
  deleteMasterBank,
  postCategory,
  getCategories,
  updateCategory,
  changeCategoryIcon,
  deleteCategory,
  postMedia,
  getMedias,
  updateMedia,
  deleteMedia,
  postMasterWallet,
  getMasterWallets,
  udpateMasterWallet,
  changeMasterWalletLogo,
  deleteMasterWallet,
  postFaq,
  getFaqs,
  updateFaq,
  deleteFaq,
} from './controller';

const routes = function routes(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  donePlugin: HookHandlerDoneFunction,
): void {
  /**
   * The order of the keys is following the order of the routes in Postman
   */

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
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(postMasterBank),
  );

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
        schemaValidation,
        handlerWrapper(protect('USER')),
        handlerWrapper(dbQuerying('BANK')),
      ],
    },
    controllerWrapper(getMasterBanks),
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
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(postMasterBankStep),
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
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(getMasterBankDetail),
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
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(updateMasterBank),
  );

  fastify.patch<
    Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateBankDetailBody }>
  >(
    '/banks/:id/account',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.updateBankAccount,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(updateMasterBankAccount),
  );

  fastify.patch<
    Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: ChangeBankLogoBody }>
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
      preValidation: (req, res, done) => {
        if (isBodyEmpty(req.body)) {
          res.unprocessableEntity();
          return;
        }

        req.body = { ...req.body, logo: renameFiles(req.url, req.body.logo) ?? req.body.logo };

        done();
      },
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(changeMasterBankLogo),
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
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(deleteMasterBankStep),
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
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(deleteMasterBank),
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
        req.body = { ...req.body, icon: renameFiles(req.url, req.body.icon) };

        done();
      },
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(postCategory),
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
        schemaValidation,
        handlerWrapper(protect('USER')),
        handlerWrapper(dbQuerying('CATEGORY')),
      ],
    },
    controllerWrapper(getCategories),
  );

  fastify.patch<
    Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateCategoryBody }>
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
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(updateCategory),
  );

  fastify.patch<
    Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: ChangeCategoryIconBody }>
  >(
    '/categories/:id/icon',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.changeCategoryIcon,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preValidation: (req, res, done) => {
        if (isBodyEmpty(req.body)) {
          res.unprocessableEntity();
          return;
        }

        req.body = { ...req.body, icon: renameFiles(req.url, req.body.icon) ?? req.body.icon };

        done();
      },
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(changeCategoryIcon),
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
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(deleteCategory),
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
      preValidation: (req, res, done) => {
        if (isBodyEmpty(req.body)) {
          res.unprocessableEntity();
          return;
        }

        req.body = { ...req.body, image: renameFiles(req.url, req.body.image) ?? req.body.image };

        done();
      },
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(postMedia),
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
      preHandler: [schemaValidation, handlerWrapper(protect('USER'))],
    },
    controllerWrapper(getMedias),
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
      preValidation: (req, res, done) => {
        if (isBodyEmpty(req.body)) {
          res.unprocessableEntity();
          return;
        }

        req.body = { ...req.body, image: renameFiles(req.url, req.body.image) ?? req.body.image };

        done();
      },
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(updateMedia),
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
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(deleteMedia),
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
        req.body = { ...req.body, logo: renameFiles(req.url, req.body.logo) };

        done();
      },
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(postMasterWallet),
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
        schemaValidation,
        handlerWrapper(protect('USER')),
        handlerWrapper(dbQuerying('WALLET')),
      ],
    },
    controllerWrapper(getMasterWallets),
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
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(udpateMasterWallet),
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
      preValidation: (req, res, done) => {
        if (isBodyEmpty(req.body)) {
          res.unprocessableEntity();
          return;
        }

        req.body = { ...req.body, logo: renameFiles(req.url, req.body.logo) ?? req.body.logo };

        done();
      },
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(changeMasterWalletLogo),
  );

  fastify.delete<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
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
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(deleteMasterWallet),
  );

  fastify.post<Request<{ Headers: ApiKeyHeader; Body: PostFaqBody }>>(
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
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(postFaq),
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
    controllerWrapper(getFaqs),
  );

  fastify.patch<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateFaqBody }>>(
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
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(updateFaq),
  );

  fastify.delete<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
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
      preHandler: [schemaValidation, handlerWrapper(protect('ADMIN'))],
    },
    controllerWrapper(deleteFaq),
  );

  donePlugin();
};

export default routes;
