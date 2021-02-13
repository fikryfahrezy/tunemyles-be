import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from "fastify";
import { helloWorld } from "./controllers";
import ApiResponse from "../../schemas/responses/api-response.json";

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
