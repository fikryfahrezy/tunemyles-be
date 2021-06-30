import type { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from 'fastify';
import type { Request } from '../../types/fasitify';
import type { PostRequestBody, FileRequestBody } from '../../types/schema';
import { controllerWrapper, handlerWrapper } from '../../utils/serverfn-wrapper';
import { renameFiles } from '../../utils/file-management';
import schemaValidation from '../../middlewares/schema-validation';
import { exampleProtect } from '../../middlewares/protect-route';
import { requestBody, requestHeaders, requestParams, responses } from './schemas';
import { getExample, postExample, getIdExample, postFileExample } from './controllers';

const routes = function routes(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  donePlugin: HookHandlerDoneFunction,
): void {
  /**
   * The order of the keys is following the order of the routes in Postman
   */

  fastify.get(
    '/',
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
    '/',
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
      preHandler: schemaValidation,
    },
    controllerWrapper(postExample),
  );

  fastify.get(
    '/:id',
    {
      schema: {
        params: requestParams.id,
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
    '/file',
    {
      attachValidation: true,
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
      preHandler: schemaValidation,
    },
    controllerWrapper(postFileExample),
  );

  fastify.get<Request>(
    '/private',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        response: {
          200: responses.datas,
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(exampleProtect)],
    },
    controllerWrapper(getExample),
  );

  donePlugin();
};

export default routes;
