import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from "fastify";
import { getExample, postExample } from "./controllers";

async function routes(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done: HookHandlerDoneFunction
): Promise<void> {
  fastify.get(
    "/example",
    {
      schema: {
        response: {
          "200": { $ref: "#ApiResponse" },
          "4xx": { $ref: "#ApiResponse" },
          "5xx": { $ref: "#ApiResponse" },
        },
      },
    },
    getExample
  );

  fastify.post(
    "/example",
    {
      schema: {
        response: {
          "200": { $ref: "#ApiResponse" },
          "4xx": { $ref: "#ApiResponse" },
          "5xx": { $ref: "#ApiResponse" },
        },
      },
    },
    postExample
  );

  done();
}

export default routes;
