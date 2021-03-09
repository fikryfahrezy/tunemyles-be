import type { Server, IncomingMessage, ServerResponse } from "http";
import type {
    FastifyRequest,
    FastifyReply,
    RouteHandlerMethod,
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    RequestGenericInterface,
    FastifyInstance,
    HookHandlerDoneFunction,
} from "fastify";

export type FastifyFn = (
    req: FastifyRequest,
    res: FastifyReply
) => Promise<void>;

export type SyncHookFn = (
    req: FastifyRequest,
    res: FastifyReply,
    done: HookHandlerDoneFunction
) => void;

export type RequestHandler<Request> = RouteHandlerMethod<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    Request
>;

export type HandlerFn<T extends RequestGenericInterface> = (
    this: FastifyInstance,
    req: FastifyRequest<T, Server, IncomingMessage>,
    res: FastifyReply<Server, IncomingMessage, ServerResponse, T, unknown>
) => void;
