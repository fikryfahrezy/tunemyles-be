import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from "fastify";
import versionTwo from "./v2";

async function api(
  instance: FastifyInstance,
  _: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) {
  instance.register(versionTwo, { prefix: "/v2" });
  done();
}
export default api;
