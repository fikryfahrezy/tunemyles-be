import type { HandlerFn } from "../types/fasitify";
import { sequelize } from "../../databases/sequelize";
import { errorHandler } from "./error-handler";

export const controllerWrapper = function <T>(fn: HandlerFn<T>): HandlerFn<T> {
    return async function (this, req, res) {
        const boundFn = fn.bind(this);
        try {
            if (req.method === "GET")
                return await Promise.resolve(boundFn(req, res));
            else
                return await sequelize.transaction(
                    async () => await Promise.resolve(boundFn(req, res))
                );
        } catch (error) {
            errorHandler(error, res);
        }
    };
};
