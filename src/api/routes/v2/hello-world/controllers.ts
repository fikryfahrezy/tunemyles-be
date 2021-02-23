import { FastifyRequest, FastifyReply, RouteHandlerMethod } from "fastify";
import * as service from "./service";

export const helloWorld: RouteHandlerMethod = async function (
  _: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const random = Math.random();
  const message = service.helloWorld(random);

  reply
    .status(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({
      code: 200,
      success: true,
      message,
    });
};
