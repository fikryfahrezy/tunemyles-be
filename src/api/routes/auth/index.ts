import type {
  FastifyRequest,
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from 'fastify';
import type { Request } from '../../types/fasitify';
import type {
  RegisterBody,
  LoginBody,
  ApiKeyHeader,
  UpdateProfileBody,
} from '../../types/schema';
import {
  controllerWrapper,
  handlerWrapper,
} from '../../utils/serverfn-wrapper';
import { schemaValidationError } from '../../utils/error-handler';
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
  fastify.post(
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
      preHandler: (req: FastifyRequest<{ Body: RegisterBody }>, res, done) => {
        const validation = req.validationError;
        if (validation) schemaValidationError(validation, res);
        done();
      },
    },
    controllerWrapper(register),
  );

  fastify.post(
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
      preHandler: (req: FastifyRequest<{ Body: LoginBody }>, res, done) => {
        const validation = req.validationError;
        if (validation) schemaValidationError(validation, res);
        done();
      },
    },
    controllerWrapper(login),
  );

  fastify.get(
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
        (
          req: FastifyRequest<{ Headers: ApiKeyHeader | unknown }>,
          res,
          done,
        ) => {
          const validation = req.validationError;
          if (validation) schemaValidationError(validation, res);
          done();
        },
        handlerWrapper(protect('user')),
      ],
    },
    controllerWrapper(getProfile),
  );

  fastify.put(
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
      preHandler: [
        (
          req: FastifyRequest<{
            Body: UpdateProfileBody;
            Headers: ApiKeyHeader;
          }>,
          res,
          done,
        ) => {
          const validation = req.validationError;
          if (validation) schemaValidationError(validation, res);
          done();
        },
        handlerWrapper(protect('user')),
      ],
    },
    controllerWrapper(updateProfile),
  );

  fastify.post(
    '/auth/forgot-password',
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
      preHandler: (req: FastifyRequest<Request>, res, done) => {
        const validation = req.validationError;
        if (validation) schemaValidationError(validation, res);
        done();
      },
    },
    controllerWrapper(forgotPassword),
  );

  fastify.get(
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
      preHandler: (req: FastifyRequest<Request>, res, done) => {
        const validation = req.validationError;
        if (validation) schemaValidationError(validation, res);
        done();
      },
    },
    controllerWrapper(verifyToken),
  );

  fastify.put(
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
      preHandler: (req: FastifyRequest<Request>, res, done) => {
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
