import { FastifyRequest, FastifyReply } from "fastify";

export async function helloWorld(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  req.log.info("hi");
  reply
    .status(200)
    .header("Content-Type", "text/plain; charset=utf-8")
    .send("hello world");
}
