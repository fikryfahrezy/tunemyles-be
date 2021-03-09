import type { HandlerFn } from "../types/fn";
import { errorHandler } from "./error-handler";
import { sequelize } from "../../databases/sequelize";

export const handlerWrapper = function <T>(fn: HandlerFn<T>): HandlerFn<T> {
    return async function (this, req, res) {
        const boundFn = fn.bind(this);
        try {
            if (req.method === "GET")
                return await Promise.resolve(boundFn(req, res));
            else
                return await Promise.resolve(
                    sequelize.transaction(async function () {
                        boundFn(req, res);
                    })
                );
        } catch (error) {
            errorHandler(error, res);
        }
    };
};
