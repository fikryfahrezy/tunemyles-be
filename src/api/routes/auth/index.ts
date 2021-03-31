import type {
  FastifyRequest,
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from 'fastify';
import type { RegisterBody, LoginBody, ApiKeyHeader } from '../../types/schema';
import {
  controllerWrapper,
  handlerWrapper,
} from '../../utils/serverfn-wrapper';
import { schemaValidationError } from '../../utils/error-handler';
import { protect } from '../../middlewares/protect-route';
import { requestBody, responses } from './schemas';
import { register, login, getProfile } from './controllers';

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

  donePlugin();
};

export default routes;
