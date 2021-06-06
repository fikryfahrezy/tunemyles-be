import { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from 'fastify';
import helloWorld from './hello-world';
import example from './example';
import auth from './auth';
import master from './master';
import merchant from './merchant';

const routeV2 = function routeV2(
  instance: FastifyInstance,
  _: FastifyPluginOptions,
  donePlugin: HookHandlerDoneFunction,
): void {
  instance.register(helloWorld);
  instance.register(example, { prefix: '/example' });
  instance.register(auth, { prefix: '/auth' });
  instance.register(master, { prefix: '/masters' });
  instance.register(merchant, { prefix: '/merchants' });

  donePlugin();
};

export default routeV2;
