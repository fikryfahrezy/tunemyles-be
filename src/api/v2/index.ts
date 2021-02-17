import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from "fastify";
import helloWorld from "./hello-world/routes";

async function api(
  instance: FastifyInstance,
  _: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) {
  instance.register(helloWorld);
  done();
}
export default api;
