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
    "/",
    {
      schema: {
        response: {
          "200": { $ref: "#ApiResponse" },
          "4xx": { $ref: "#ApiResponse" },
          "5xx": { $ref: "#ApiResponse" },
        },
      },
    },
    helloWorld
  );

  done();
}

export default routes;
