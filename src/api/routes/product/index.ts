import type { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from 'fastify';
import type { Request } from '../../types/fasitify';
import type { IdRequestParams, GetQuery } from '../../types/schema';
import dbQuerying from '../../middlewares/db-querying';
import schemaValidation from '../../middlewares/schema-validation';
import { controllerWrapper, handlerWrapper } from '../../utils/serverfn-wrapper';
import { requestQuery, requestParams } from './schemas';
import { getProducts, getProductsByCategory } from './controller';

const routes = function routes(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  donePlugin: HookHandlerDoneFunction,
): void {
  /**
   * The order of the keys is following the order of the routes in Postman
   */

  fastify.get<Request<{ Querystring: GetQuery }>>(
    '/',
    {
      attachValidation: true,
      schema: {
        querystring: requestQuery.getProduct,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(dbQuerying('PRODUCT'))],
    },
    controllerWrapper(getProducts),
  );

  fastify.get<Request<{ Params: IdRequestParams; Querystring: GetQuery }>>(
    '/categories/:id',
    {
      attachValidation: true,
      schema: {
        params: requestParams.id,
        querystring: requestQuery.getProduct,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(dbQuerying('PRODUCT'))],
    },
    controllerWrapper(getProductsByCategory),
  );

  donePlugin();
};

export default routes;
