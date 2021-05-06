import type { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from 'fastify';
import type { Request } from '../../types/fasitify';
import type { PostRequestBody, FileRequestBody } from '../../types/schema';
import { controllerWrapper, handlerWrapper } from '../../utils/serverfn-wrapper';
import { schemaValidationError } from '../../utils/error-handler';
import { renameFiles } from '../../utils/file-management';
import { exampleProtect } from '../../middlewares/protect-route';
import { requestBody, requestHeader, requestParams, responses } from './schemas';
import { getExample, postExample, getIdExample, postFileExample } from './controllers';

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

  fastify.post<Request<{ Body: PostRequestBody }>>(
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
      preHandler: (req, res, done) => {
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

  fastify.post<Request<{ Body: FileRequestBody }>>(
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
      preValidation: (req, __, done) => {
        req.body = {
          ...req.body,
          file: renameFiles(req.url, req.body.file) ?? req.body.file,
        };
        done();
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
        handlerWrapper(exampleProtect),
        (req, res, done) => {
          const validation = req.validationError;
          if (validation) schemaValidationError(validation, res);
          done();
        },
      ],
    },
    controllerWrapper(getExample),
  );

  donePlugin();
};

export default routes;
