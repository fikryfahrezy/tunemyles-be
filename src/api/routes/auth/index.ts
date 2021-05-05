import type { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from 'fastify';
import type { Request } from '../../types/fasitify';
import type { RegisterBody, LoginBody, ApiKeyHeader, UpdateProfileBody } from '../../types/schema';
import { controllerWrapper, handlerWrapper } from '../../utils/serverfn-wrapper';
import { schemaValidationError } from '../../utils/error-handler';
import { renameFiles } from '../../utils/file-management';
import { protect } from '../../middlewares/protect-route';
import { requestHeader, requestBody, responses } from './schemas';
import {
  register,
  login,
  getProfile,
  updateProfile,
  verifyToken,
  resetPassword,
  forgotPassword,
} from './controllers';

const routes = function routes(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  donePlugin: HookHandlerDoneFunction,
): void {
  fastify.post<Request<RegisterBody>>(
    '/auth/register',
    {
      attachValidation: true,
      schema: {
        body: requestBody.register,
        response: {
          200: responses.authenticated,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: (req, res, done) => {
        const validation = req.validationError;
        if (validation) schemaValidationError(validation, res);
        done();
      },
    },
    controllerWrapper(register),
  );

  fastify.post<Request<LoginBody>>(
    '/auth/login',
    {
      attachValidation: true,
      schema: {
        body: requestBody.login,
        response: {
          200: responses.authenticated,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: (req, res, done) => {
        const validation = req.validationError;
        if (validation) schemaValidationError(validation, res);
        done();
      },
    },
    controllerWrapper(login),
  );

  fastify.get<Request<unknown, unknown, unknown, ApiKeyHeader>>(
    '/auth/me',
    {
      attachValidation: true,
      schema: {
        headers: requestHeader.private,
        response: {
          200: responses.me,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        handlerWrapper(protect('USER')),
        (req, res, done) => {
          const validation = req.validationError;
          if (validation) schemaValidationError(validation, res);
          done();
        },
      ],
    },
    controllerWrapper(getProfile),
  );

  fastify.put<Request<UpdateProfileBody, unknown, unknown, ApiKeyHeader>>(
    '/auth/update-profile',
    {
      attachValidation: true,
      schema: {
        headers: requestHeader.private,
        body: requestBody.updateProfile,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preValidation: (req, __, done) => {
        req.body = { ...req.body, avatar: renameFiles(req.url, req.body.avatar) };
        done();
      },
      preHandler: [
        handlerWrapper(protect('USER')),
        (req, res, done) => {
          const validation = req.validationError;
          if (validation) schemaValidationError(validation, res);
          done();
        },
      ],
    },
    controllerWrapper(updateProfile),
  );

  fastify.post<Request>(
    '/auth/forgot-password',
    {
      attachValidation: true,
      schema: {
        body: requestBody.forgotPassword,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: (req, res, done) => {
        const validation = req.validationError;
        if (validation) schemaValidationError(validation, res);
        done();
      },
    },
    controllerWrapper(forgotPassword),
  );

  fastify.get<Request>(
    '/auth/verify-token',
    {
      attachValidation: true,
      schema: {
        body: {},
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: (req, res, done) => {
        const validation = req.validationError;
        if (validation) schemaValidationError(validation, res);
        done();
      },
    },
    controllerWrapper(verifyToken),
  );

  fastify.put<Request>(
    '/auth/reset-password',
    {
      attachValidation: true,
      schema: {
        body: {},
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: (req, res, done) => {
        const validation = req.validationError;
        if (validation) schemaValidationError(validation, res);
        done();
      },
    },
    controllerWrapper(resetPassword),
  );

  donePlugin();
};

export default routes;
