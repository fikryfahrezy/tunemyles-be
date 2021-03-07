// import {
//   RequestGenericInterface,
//   FastifyRequest,
//   FastifyReply,
// } from "fastify";
// import type { RequestHandler } from '../../../types'
// const check: RequestHandler<RequestGenericInterface> = async function (
//   _: FastifyRequest,
//   reply: FastifyReply
// ): Promise<void> {
//   console.log(this.getSchema('#ApiResponse'))
//   const random = Math.random()
//   if (random < 0.5) throw new Error('err')
//   reply.send('hi')
// };

// type Test = (fn: (this: FastifyInstance, req: FastifyRequest, res: FastifyReply) => void) => (this:FastifyInstance, req: FastifyRequest, res: FastifyReply) => Promise<void>
// const test: Test =  function (fn) {
//   return async function (req, res) {
//     const ajk = fn.bind(this)
//     Promise.resolve(ajk(req,res)).catch(err => {
//       console.log(err)
//       throw err
//     })
//     return res
//   }
// }

// const letCheck = test(check)

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
import schemas from "./schemas";

const { requestBody, requestHeader, requestParams, responses } = schemas;

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
          "200": responses.datas,
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
        body: requestBody.postBody,
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
        params: requestParams.routeId,
        response: {
          "200": responses.data,
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
        body: requestBody.postFile,
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
        headers: requestHeader.private,
        response: {
          "200": responses.datas,
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
