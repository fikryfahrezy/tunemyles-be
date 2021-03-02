import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from "fastify";
import {
  getExample,
  postExample,
  getIdExample,
  postFileExample,
} from "./controllers";

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

  fastify.get(
    "/example/:id",
    {
      schema: {
        response: {
          "200": { $ref: "#ApiResponse" },
          "4xx": { $ref: "#ApiResponse" },
          "5xx": { $ref: "#ApiResponse" },
        },
      },
    },
    getIdExample
  );

  fastify.post(
    "/example/file",
    {
      schema: {
        response: {
          "200": { $ref: "#ApiResponse" },
          "4xx": { $ref: "#ApiResponse" },
          "5xx": { $ref: "#ApiResponse" },
        },
      },
    },
    postFileExample
  );

  fastify.get(
    "/example/private",
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

  done();
}

export default routes;
