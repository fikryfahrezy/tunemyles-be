import type { HandlerWrapperParam } from "../types/util";
import type { UserUtility } from "../types/model";
import { QueryTypes } from "sequelize";
import { sequelize } from "../../databases/sequelize";
import { ErrorResponse } from "../utils/error-handler";

const userUtility: (token: string) => Promise<UserUtility> = (token) => {
    const sqlQuery = `
        SELECT
            id,
            id_m_users AS user_id,
            type
        FROM u_user
        WHERE api_token = :token
   `;
    const userUtility = sequelize.query<UserUtility>(sqlQuery, {
        replacements: { token },
        type: QueryTypes.SELECT,
        plain: true,
    });
    return userUtility;
};

export const exampleProtect: (req: HandlerWrapperParam) => void = function (
    req
) {
    const {
        headers: { authorization },
    } = req;
    if (authorization === "2") throw new ErrorResponse("forbidden", 403);
};

export const userProtect: (req: HandlerWrapperParam) => Promise<void> = async (
    req
) => {
    const authorization = req.headers.authorization as string;
    if (!authorization) throw new ErrorResponse("forbidden", 403);
    const user = await userUtility(authorization);
    if (!user) throw new ErrorResponse("forbidden", 403);
    else if (user.type && user.type >= 3)
        throw new ErrorResponse("forbidden", 403);
};

export const adminProtect: (
    req: HandlerWrapperParam
) => Promise<void> = async () => {
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

export const merchantProtect: (
    req: HandlerWrapperParam
) => Promise<void> = async () => {
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
