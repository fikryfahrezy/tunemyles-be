import { FastifyReply } from "fastify";
import ErrorResposne from "./error-esponse";

export const errorHandler = function (
    error: ErrorResposne | unknown,
    reply: FastifyReply
): void {
    if (error instanceof ErrorResposne) {
        const { message, status } = error;
        if (status === 404) {
            reply.notFound(message);
        }
    } else throw new Error("...");
};
