import type { FastifyRequest, FastifyReply } from 'fastify';
import type { PostRequestBody, GetIdRequestParams, FileRequestBody } from '../../types/schema';
import type { Request, RequestHandler } from '../../types/fasitify';
import { getIdService, getService, postFileService, postService } from './service';

export const getExample: RequestHandler<Request> = function getExample(
  _: FastifyRequest,
  res: FastifyReply,
): void {
  const data = getService();

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'get success',
    data,
  });
};

export const postExample: RequestHandler<Request<PostRequestBody>> = function postExample(
  req: FastifyRequest<{ Body: PostRequestBody }>,
  res: FastifyReply,
): void {
  postService(req.body.name);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
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
  const data = getIdService(Number(req.params.id));

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
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
  await postFileService(req.body.file);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'post success',
  });
};
