import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from 'fastify';
import helloWorld from './hello-world';
import example from './example';
import auth from './auth';

const routeV2 = function routeV2(
  instance: FastifyInstance,
  _: FastifyPluginOptions,
  donePlugin: HookHandlerDoneFunction,
): void {
  instance.register(helloWorld);
  instance.register(example);
  instance.register(auth);
  donePlugin();
};

export default routeV2;
