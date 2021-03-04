import { FastifyRequest, FastifyReply, RequestGenericInterface } from "fastify";
import {
  getIdService,
  getService,
  postFileService,
  postService,
} from "./service";
import type { RequestHandler, AddedFileBody } from "../../../types";

interface GetIdRequest extends RequestGenericInterface {
  Params: { id: string };
}

interface PostRequest extends RequestGenericInterface {
  Body: { name: string };
}

interface FileRequest extends RequestGenericInterface {
  Body: {
    file: AddedFileBody[];
  };
}

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
      message: "get success",
      data,
    });
};

export const postExample: RequestHandler<PostRequest> = async function (
  request,
  reply: FastifyReply
): Promise<void> {
  const { name } = request.body;
  postService(name);

  reply
    .status(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({
      code: 200,
      success: true,
      message: "post success",
    });
};

export const getIdExample: RequestHandler<GetIdRequest> = async function (
  request,
  reply: FastifyReply
): Promise<void> {
  const { id } = request.params;
  const paramId = Number(id);
  const data = getIdService(paramId);
  if (data instanceof Error && Number(data.message) === 404) reply.notFound();

  reply
    .status(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({
      code: 200,
      success: true,
      message: "get success",
      data,
    });
};

export const postFileExample: RequestHandler<FileRequest> = async function (
  request,
  reply: FastifyReply
): Promise<void> {
  const { file } = request.body;
  postFileService(file);

  reply
    .status(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({
      code: 200,
      success: true,
      message: "post success",
    });
};
