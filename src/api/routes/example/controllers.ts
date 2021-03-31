import type { FastifyRequest, FastifyReply } from 'fastify';
import type {
  PostRequestBody,
  GetIdRequestParams,
  FileRequestBody,
} from '../../types/schema';
import type { Request, RequestHandler } from '../../types/fasitify';
import {
  getIdService,
  getService,
  postFileService,
  postService,
} from './service';

export const getExample: RequestHandler<Request> = function getExample(
  _: FastifyRequest,
  res: FastifyReply,
): void {
  const data = getService();

  res
    .status(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      code: 200,
      success: true,
      message: 'get success',
      data,
    });
};

export const postExample: RequestHandler<
Request<PostRequestBody>
> = function postExample(
  req: FastifyRequest<{ Body: PostRequestBody }>,
  res: FastifyReply,
): void {
  const { name } = req.body;
  postService(name);

  res
    .status(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      code: 200,
      success: true,
      message: 'post success',
    });
};

export const getIdExample: RequestHandler<
Request<unknown, unknown, GetIdRequestParams>
> = function getIdExample(
  req: FastifyRequest<{ Params: GetIdRequestParams }>,
  res: FastifyReply,
): void {
  const { id } = req.params;
  const paramId = Number(id);
  const data = getIdService(paramId);

  res
    .status(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      code: 200,
      success: true,
      message: 'get success',
      data,
    });
};

export const postFileExample: RequestHandler<
Request<FileRequestBody>
> = async function postFileExample(
  req: FastifyRequest<{ Body: FileRequestBody }>,
  res: FastifyReply,
): Promise<void> {
  const { file } = req.body;
  await postFileService(file);

  res
    .status(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      code: 200,
      success: true,
      message: 'post success',
    });
};
