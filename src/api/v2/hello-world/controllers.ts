import { FastifyRequest, FastifyReply, RouteHandlerMethod } from "fastify";

export const helloWorld: RouteHandlerMethod = async function (
  _: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  reply
    .status(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({
      code: 200,
      success: true,
      message: "hello world",
    });
};
