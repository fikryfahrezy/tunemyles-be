import { FastifyRequest, FastifyReply, RouteHandlerMethod } from "fastify";
import {
  getIdService,
  getService,
  postFileService,
  postService,
} from "./service";

export const getExample = async function (
  _: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const data = getService();

  reply
    .status(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({
      code: 200,
      success: true,
      message: "hello world",
      data,
    });
};

export const postExample: RouteHandlerMethod = async function (
  _: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  postService();

  reply
    .status(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({
      code: 200,
      success: true,
      message: "post success",
    });
};

export const getIdExample: RouteHandlerMethod = async function (
  _: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const data = getIdService(1);

  reply
    .status(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({
      code: 200,
      success: true,
      message: "post success",
      data,
    });
};

export const postFileExample: RouteHandlerMethod = async function (
  _: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  postFileService();

  reply
    .status(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({
      code: 200,
      success: true,
      message: "post success",
    });
};
