import type { FastifyReply } from "fastify";
import type { Validation } from "../types/util";

export class ErrorResponse extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;

        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler: (
    err: ErrorResponse | unknown,
    res: FastifyReply
) => void = (err, res) => {
    if (err instanceof ErrorResponse) {
        const { message, status } = err;
        if (status === 404) {
            res.notFound(message);
        }
    } else throw new Error("...");
};

export const schemaValidationError: (
    err: Error & { validation: Validation[]; validationContext: string },
    res: FastifyReply
) => void = (err, res) => {
    const context = err.validationContext;
    if (context === "headers") res.forbidden();
    res.unprocessableEntity();
};
