import { FastifyRequest, FastifyReply, RouteHandlerMethod } from 'fastify';
import service from './service';

const helloWorld: RouteHandlerMethod = function helloWorld(
  _: FastifyRequest,
  reply: FastifyReply,
): void {
  const random = Math.random();
  const message = service(random);

  reply
    .status(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      code: 200,
      success: true,
      message,
    });
};

export default helloWorld;
