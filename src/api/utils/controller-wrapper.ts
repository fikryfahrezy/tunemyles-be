import {
    FastifyInstance,
    FastifyRequest,
    FastifyReply,
    RequestGenericInterface,
    RequestBodyDefault,
    RequestQuerystringDefault,
    RequestParamsDefault,
    RequestHeadersDefault,
} from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { sequelize } from "../../databases/sequelize";

interface ReplyGenericInterface {
    Reply?: unknown;
}

interface RouteGenericInterface
    extends RequestGenericInterface,
        ReplyGenericInterface {}

type Params = {
    id: string;
};

interface Request extends RouteGenericInterface {
    Body?: RequestBodyDefault;
    Querystring?: RequestQuerystringDefault;
    Params: Params;
    Headers?: RequestHeadersDefault;
}

type HandlerWrapper = (
    fn: (
        this: FastifyInstance,
        req: FastifyRequest<Request, Server, IncomingMessage>,
        res: FastifyReply<
            Server,
            IncomingMessage,
            ServerResponse,
            Request,
            unknown
        >
    ) => void
) => (
    this: FastifyInstance,
    req: FastifyRequest<Request, Server, IncomingMessage>,
    res: FastifyReply<Server, IncomingMessage, ServerResponse, Request, unknown>
) => Promise<void>;

export const handlerWrapper: HandlerWrapper = function (fn) {
    return async function (req, res) {
        const ajk = fn.bind(this);
        try {
            if (req.method === "GET") return ajk(req, res);
            else
                return sequelize.transaction(async function () {
                    ajk(req, res);
                });
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
};
