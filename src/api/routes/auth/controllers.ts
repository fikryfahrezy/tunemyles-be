import type { FastifyRequest, FastifyReply } from "fastify";
import type { RegisterBody } from "../../types/schema";
import type { Request } from "../../types/fasitify";
import type { RequestHandler } from "../../types/fasitify";
import { userRegistration } from "./service";

export const register: RequestHandler<Request<RegisterBody>> = async function (
    req: FastifyRequest<{ Body: RegisterBody }>,
    res: FastifyReply
): Promise<void> {
    const body = req.body;
    const data = await userRegistration(body);
    res.status(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
            code: 200,
            success: true,
            message: "post success",
            data,
        });
};
