import type { Server, IncomingMessage, ServerResponse } from 'http';
import type {
  FastifyRequest,
  FastifyReply,
  RouteHandlerMethod,
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RequestGenericInterface,
  HookHandlerDoneFunction,
} from 'fastify';

export type Request<B = unknown, Q = unknown, P = unknown, H = unknown> = {
  Body: B;
  Querystring: Q;
  Params: P;
  Headers: H;
};

export type SyncHookFn = (
  req: FastifyRequest,
  res: FastifyReply,
  done: HookHandlerDoneFunction,
) => void;

export type RequestHandler<T extends RequestGenericInterface> = RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  T
>;

export type PreHandlerFn<T extends RequestGenericInterface> = (
  req: FastifyRequest<T, Server, IncomingMessage>,
  res: FastifyReply<Server, IncomingMessage, ServerResponse, T, unknown>,
) => Promise<void> | void;
