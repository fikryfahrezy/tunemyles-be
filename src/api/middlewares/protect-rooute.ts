import type {
    FastifyReply,
    FastifyRequest,
    HookHandlerDoneFunction,
} from "fastify";
import type { FastifyFn } from "../types/fn";
// const UserUtility = require("../models/UserUtility");
// const ErrorResponse = require("../utils/ErrorResponse");

export const exampleProtect = function (
    req: FastifyRequest<{ Body: Record<string, unknown> }>,
    res: FastifyReply,
    done: HookHandlerDoneFunction
) {
    if (req.headers.key === "2") res.forbidden();
    done();
};

export const userProtect: FastifyFn = async (req, res) => {
    console.log("hi");
    //   const { authorization } = ctx.header;
    //   if (!authorization) throw new ErrorResponse("forbidden", 403);
    //   const user = await UserUtility.findOne({
    //     where: {
    //       api_token: authorization,
    //     },
    //   });
    //   if (!user) throw new ErrorResponse("forbidden", 403);
    //   else if (user.type >= 3) throw new ErrorResponse("forbidden", 403);
    //   ctx.state.user = user;
    //   await next();
};

export const adminProtect: FastifyFn = async (req, res) => {
    console.log("hi");
    //   const { authorization } = ctx.header;
    //   if (!authorization) throw new ErrorResponse("forbidden", 403);
    //   const user = await UserUtility.findOne({
    //     where: {
    //       api_token: authorization,
    //     },
    //   });
    //   if (!user) throw new ErrorResponse("forbidden", 403);
    //   else if (user.type !== 2 || user.type >= 3)
    //     throw new ErrorResponse("forbidden", 403);
    //   ctx.state.user = user;
    //   await next();
};

export const merchantProtect: FastifyFn = async (req, res) => {
    console.log("hi");
    //   const { authorization } = ctx.header;
    //   if (!authorization) throw new ErrorResponse("forbidden", 403);
    //   const user = await UserUtility.findOne({
    //     where: {
    //       api_token: authorization,
    //     },
    //   });
    //   if (!user) throw new ErrorResponse("forbidden", 403);
    //   else if (user.type >= 3 || user.type < 1)
    //     throw new ErrorResponse("forbidden", 403);
    //   ctx.state.user = user;
    //   await next();
};
