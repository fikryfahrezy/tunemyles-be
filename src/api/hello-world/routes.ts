import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from "fastify";
import { helloWorld } from "./controllers";

async function routes(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done: HookHandlerDoneFunction
): Promise<void> {
  fastify.get(
    "/v2",
    {
      schema: {
        response: {
          200: { type: "string" },
        },
      },
    },
    helloWorld
  );

  done();
}

export default routes;
