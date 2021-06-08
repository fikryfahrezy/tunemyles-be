import type { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from 'fastify';
import type { Request } from '../../types/fasitify';
import type {
  ApiKeyHeader,
  IdRequestParams,
  AddToCartBody,
  CheckoutBody,
  UpdateCartItemQtyBody,
} from '../../types/schema';
import { controllerWrapper, handlerWrapper } from '../../utils/serverfn-wrapper';
import { protect } from '../../middlewares/protect-route';
import schemaValidation from '../../middlewares/schema-validation';
import { requestHeaders, requestBody, requestParams } from './schemas';
import {
  addItemToCart,
  getCartItems,
  updateCartItemQty,
  deleteCartItem,
  checkout,
} from './controllers';

const routes = function routes(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  donePlugin: HookHandlerDoneFunction,
): void {
  /**
   * The order of the keys is following the order of the routes in Postman
   */

  fastify.post<Request<{ Headers: ApiKeyHeader; Body: AddToCartBody }>>(
    '/',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        body: requestBody.addToCart,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('USER'))],
    },
    controllerWrapper(addItemToCart),
  );

  fastify.get<Request<{ Headers: ApiKeyHeader }>>(
    '/',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('USER'))],
    },
    controllerWrapper(getCartItems),
  );

  fastify.patch<
    Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateCartItemQtyBody }>
  >(
    '/:id',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        params: requestParams.id,
        body: requestBody.updateProductQty,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('USER'))],
    },
    controllerWrapper(updateCartItemQty),
  );

  fastify.delete<Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>>(
    '/:id',
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
      preHandler: [schemaValidation, handlerWrapper(protect('USER'))],
    },
    controllerWrapper(deleteCartItem),
  );

  fastify.post<Request<{ Headers: ApiKeyHeader; Body: CheckoutBody }>>(
    '/checkout',
    {
      attachValidation: true,
      schema: {
        headers: requestHeaders.private,
        body: requestBody.checkout,
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
      preHandler: [schemaValidation, handlerWrapper(protect('USER'))],
    },
    controllerWrapper(checkout),
  );

  donePlugin();
};

export default routes;
