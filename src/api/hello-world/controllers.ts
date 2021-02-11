import { FastifyRequest, FastifyReply } from 'fastify';

export async function helloWorld(
  _: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  reply
    .status(200)
    .header('Content-Type', 'text/plain; charset=utf-8')
    .send('hello world');
}
