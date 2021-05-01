import { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from 'fastify';
import helloWorld from './controllers';

const routes = function routes(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  donePlugin: HookHandlerDoneFunction,
): void {
  fastify.get(
    '/',
    {
      schema: {
        response: {
          200: { $ref: '#ApiResponse' },
          '4xx': { $ref: '#ApiResponse' },
          '5xx': { $ref: '#ApiResponse' },
        },
      },
    },
    helloWorld,
  );

  donePlugin();
};

export default routes;
