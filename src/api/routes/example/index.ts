import type {
  FastifyRequest,
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from 'fastify';
import type { PostRequestBody } from '../../types/schema';
import {
  controllerWrapper,
  handlerWrapper,
} from '../../utils/serverfn-wrapper';
import { schemaValidationError } from '../../utils/error-handler';
import { exampleProtect } from '../../middlewares/protect-route';
import {
  requestBody,
  requestHeader,
  requestParams,
  responses,
} from './schemas';
import {
  getExample,
  postExample,
  getIdExample,
  postFileExample,
} from './controllers';

const routes = function routes(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  donePlugin: HookHandlerDoneFunction,
): void {
  fastify.get(
    '/example',
    {
      schema: {
        response: {
          200: responses.datas,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
    },
    controllerWrapper(getExample),
  );

  fastify.post(
    '/example',
    {
      attachValidation: true,
      schema: {
        body: requestBody.postBody,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: (
        req: FastifyRequest<{ Body: PostRequestBody }>,
        res,
        done,
      ) => {
        const validation = req.validationError;
        if (validation) schemaValidationError(validation, res);
        done();
      },
    },
    controllerWrapper(postExample),
  );

  fastify.get(
    '/example/:id',
    {
      schema: {
        params: requestParams.routeId,
        response: {
          200: responses.data,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
    },
    controllerWrapper(getIdExample),
  );

  fastify.post(
    '/example/file',
    {
      schema: {
        body: requestBody.postFile,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
    },
    controllerWrapper(postFileExample),
  );

  fastify.get(
    '/example/private',
    {
      attachValidation: true,
      schema: {
        headers: requestHeader.private,
        response: {
          200: responses.datas,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [
        (req: FastifyRequest<{ Headers: unknown }>, res, done) => {
          const validation = req.validationError;
          if (validation) schemaValidationError(validation, res);
          done();
        },
        handlerWrapper(exampleProtect),
      ],
    },
    controllerWrapper(getExample),
  );

  donePlugin();
};

export default routes;
