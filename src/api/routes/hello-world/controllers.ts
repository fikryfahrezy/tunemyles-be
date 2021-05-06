import { RouteHandlerMethod } from 'fastify';
import service from './service';

const helloWorld: RouteHandlerMethod = function helloWorld(_, reply): void {
  const random = Math.random();
  const resMessage = service(random);

  reply.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: resMessage,
  });
};

export default helloWorld;
