import type { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from 'fastify';
import type { Request } from '../../types/fasitify';
import type {
  ApiKeyHeader,
  VerifyTokenParams,
  RegisterBody,
  LoginBody,
  UpdateProfileBody,
  ForgotPasswordBody,
  ResetPasswordBody,
} from '../../types/schema';
import { controllerWrapper, handlerWrapper } from '../../utils/serverfn-wrapper';
import { schemaValidationError } from '../../utils/error-handler';
import { renameFiles } from '../../utils/file-management';
import { protect } from '../../middlewares/protect-route';
import { requestHeaders, requestBody, responses } from './schemas';
import {
  register,
  login,
  getProfile,
  updateProfile,
  verifyToken,
  resetPassword,
  forgotPassword,
  createAdmin,
} from './controllers';

const routes = function routes(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  donePlugin: HookHandlerDoneFunction,
): void {
  /**
   * The order of the keys is following the order of the routes in Postman
   */

  fastify.post<Request<{ Body: RegisterBody }>>(
    '/register',
    {
      attachValidation: true,
      schema: {
        body: requestBody.register,
        response: {
          201: responses.authenticated,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: ({ validationError }, res, done) => {
        if (validationError) schemaValidationError(validationError, res);

        done();
      },
    },
    controllerWrapper(register),
  );

  fastify.post<Request<{ Body: LoginBody }>>(
    '/login',
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
      preHandler: ({ validationError }, res, done) => {
        if (validationError) schemaValidationError(validationError, res);

        done();
      },
    },
    controllerWrapper(login),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader }>>(
    '/me',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        response: {
          200: responses.me,
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
    controllerWrapper(getProfile),
  );

  fastify.patch<Request<{ Body: UpdateProfileBody; Headers: ApiKeyHeader }>>(
    '/update-profile',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
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
        ({ validationError }, res, done) => {
          if (validationError) schemaValidationError(validationError, res);

          done();
        },
        handlerWrapper(protect('USER')),
      ],
    },
    controllerWrapper(updateProfile),
  );

  fastify.post<Request<{ Body: ForgotPasswordBody }>>(
    '/forgot-password',
    {
      attachValidation: true,
      schema: {
        body: requestBody.forgotPassword,
        response: {
          201: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: ({ validationError }, res, done) => {
        if (validationError) schemaValidationError(validationError, res);

        done();
      },
    },
    controllerWrapper(forgotPassword),
  );

  fastify.patch<Request<{ Params: VerifyTokenParams }>>(
    '/verify-token/:token',
    {
      attachValidation: true,
      schema: {
        response: {
          200: responses.verifyToken,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: ({ validationError }, res, done) => {
        if (validationError) schemaValidationError(validationError, res);

        done();
      },
    },
    controllerWrapper(verifyToken),
  );

  fastify.patch<Request<{ Body: ResetPasswordBody }>>(
    '/reset-password',
    {
      attachValidation: true,
      schema: {
        body: requestBody.resetPassword,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: ({ validationError }, res, done) => {
        if (validationError) schemaValidationError(validationError, res);

        done();
      },
    },
    controllerWrapper(resetPassword),
  );

  fastify.patch<Request>(
    '/admin',
    {
      onRequest: (__, res, done) => {
        if (process.env.NODE_ENV !== 'test') res.methodNotAllowed();

        done();
      },
      preHandler: handlerWrapper(protect('USER')),
    },
    controllerWrapper(createAdmin),
  );

  donePlugin();
};

export default routes;
