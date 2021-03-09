import type {
    FastifyRequest,
    FastifyReply,
    RequestGenericInterface,
} from "fastify";
import type {
    PostRequest,
    PostRequestBody,
    GetIdRequest,
    GetIdRequestParams,
    FileRequest,
    FileRequestBody,
} from "../../types/schema";
import type { RequestHandler } from "../../types/fn";
import {
    getIdService,
    getService,
    postFileService,
    postService,
} from "./service";

export const getExample: RequestHandler<RequestGenericInterface> = async function (
    _: FastifyRequest,
    res: FastifyReply
): Promise<void> {
    const data = getService();

    res.status(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
            code: 200,
            success: true,
            message: "get success",
            data,
        });
};

export const postExample: RequestHandler<PostRequest> = async function (
    req: FastifyRequest<{ Body: PostRequestBody }>,
    res: FastifyReply
): Promise<void> {
    const { name } = req.body;
    postService(name);

    res.status(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
            code: 200,
            success: true,
            message: "post success",
        });
};

export const getIdExample: RequestHandler<GetIdRequest> = async function (
    req: FastifyRequest<{ Params: GetIdRequestParams }>,
    res: FastifyReply
): Promise<void> {
    const { id } = req.params;
    const paramId = Number(id);
    const data = getIdService(paramId);

    res.status(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
            code: 200,
            success: true,
            message: "get success",
            data,
        });
};

export const postFileExample: RequestHandler<FileRequest> = async function (
    req: FastifyRequest<{ Body: FileRequestBody }>,
    res: FastifyReply
): Promise<void> {
    const { file } = req.body;
    await postFileService(file);

    res.status(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
            code: 200,
            success: true,
            message: "post success",
        });
};
