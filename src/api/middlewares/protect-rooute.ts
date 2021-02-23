// const UserUtility = require("../models/UserUtility");
// const ErrorResponse = require("../utils/ErrorResponse");
import { FastifyRequest, FastifyReply } from "fastify";

export const userProtect = async (req: FastifyRequest, reply: FastifyReply) => {
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

export const adminProtect = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
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

export const merchantProtect = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
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
