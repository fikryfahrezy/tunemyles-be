import { ErrorResponse } from "../utils/error-handler";

export const exampleProtect = function (request: Record<string, unknown>) {
    const {
        headers: { authorization },
    } = request as Record<string, Record<string, unknown>>;
    if (authorization === "2") throw new ErrorResponse("forbidden", 403);
};

export const userProtect = async (req: Record<string, unknown>) => {
    //   const  { authorization }  = req.headers
    //   if (!authorization) throw new ErrorResponse("forbidden", 403);
    //   const user = await UserUtility.findOne({
    //     where: {
    //       api_token: authorization,
    //     },
    //   });
    //   if (!user) throw new ErrorResponse("forbidden", 403);
    //   else if (user.type >= 3) throw new ErrorResponse("forbidden", 403);
};

export const adminProtect = async (req: Record<string, unknown>) => {
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

export const merchantProtect = async (req: Record<string, unknown>) => {
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
