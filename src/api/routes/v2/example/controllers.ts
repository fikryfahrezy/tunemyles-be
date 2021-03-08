import { FastifyRequest, FastifyReply, RequestGenericInterface } from "fastify";
import {
    getIdService,
    getService,
    postFileService,
    postService,
} from "./service";
import { errorHandler } from "../../../utils/error-handler";
import type { RequestHandler, AddedFileBody } from "../../../types";

type GetIdRequestParams = {
    id: string;
};

type PostRequestBody = {
    name: string;
};

type FileRequestBody = {
    file: AddedFileBody[];
};

interface GetIdRequest extends RequestGenericInterface {
    Params: GetIdRequestParams;
}

interface PostRequest extends RequestGenericInterface {
    Body: PostRequestBody;
}

interface FileRequest extends RequestGenericInterface {
    Body: FileRequestBody;
}

export const getExample: RequestHandler<RequestGenericInterface> = async function (
    _: FastifyRequest,
    reply: FastifyReply
): Promise<void> {
    try {
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
    } catch (error) {
        errorHandler(error, reply);
    }
};

export const postExample: RequestHandler<PostRequest> = async function (
    request: FastifyRequest<{ Body: PostRequestBody }>,
    reply: FastifyReply
): Promise<void> {
    try {
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
    } catch (error) {
        errorHandler(error, reply);
    }
};

export const getIdExample: RequestHandler<GetIdRequest> = async function (
    request: FastifyRequest<{ Params: GetIdRequestParams }>,
    reply: FastifyReply
): Promise<void> {
    try {
        const { id } = request.params;
        const paramId = Number(id);
        const data = getIdService(paramId);

        reply
            .status(200)
            .header("Content-Type", "application/json; charset=utf-8")
            .send({
                code: 200,
                success: true,
                message: "get success",
                data,
            });
    } catch (error) {
        errorHandler(error, reply);
    }
};

export const postFileExample: RequestHandler<FileRequest> = async function (
    request: FastifyRequest<{ Body: FileRequestBody }>,
    reply: FastifyReply
): Promise<void> {
    try {
        const { file } = request.body;
        await postFileService(file);

        reply
            .status(200)
            .header("Content-Type", "application/json; charset=utf-8")
            .send({
                code: 200,
                success: true,
                message: "post success",
            });
    } catch (error) {
        errorHandler(error, reply);
    }
};
