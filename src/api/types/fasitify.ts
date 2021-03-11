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
    preHandlerAsyncHookHandler,
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

export type RequestHandler<
    T extends RequestGenericInterface
> = RouteHandlerMethod<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    T
>;

export type PreHandler<
    T extends RequestGenericInterface
> = preHandlerAsyncHookHandler<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    T
>;

// RawServer extends RawServerBase = RawServerDefault,
// RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
// RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
// RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
// ContextConfig = ContextConfigDefault

// RawServer extends RawServerBase = RawServerDefault,
// RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
// RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
// RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
// ContextConfig = ContextConfigDefault

export type HandlerFn<T extends RequestGenericInterface> = (
    this: FastifyInstance,
    req: FastifyRequest<T, Server, IncomingMessage>,
    res: FastifyReply<Server, IncomingMessage, ServerResponse, T, unknown>
) => void;

export type Request<B = unknown, Q = unknown, P = unknown, H = unknown> = {
    Body: B;
    Querystring: Q;
    Params: P;
    Headers: H;
};
