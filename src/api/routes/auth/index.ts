import type {
    FastifyRequest,
    FastifyInstance,
    FastifyPluginOptions,
    HookHandlerDoneFunction,
} from "fastify";
import type { SyncHookFn } from "../../types/fasitify";
import type { RegisterBody } from "../../types/schema";
import { register } from "./controllers";
import schemas from "./schemas";
import { controllerWrapper } from "../../utils/controller-wrapper";
import { schemaValidationError } from "../../utils/error-handler";

const { requestBody, responses } = schemas;

declare module "fastify" {
    interface FastifyInstance {
        exampleProtect: SyncHookFn;
    }
}

async function routes(
    fastify: FastifyInstance,
    _: FastifyPluginOptions,
    done: HookHandlerDoneFunction
): Promise<void> {
    fastify.post(
        "/auth/register",
        {
            attachValidation: true,
            schema: {
                body: requestBody.register,
                response: {
                    "200": responses.authenticated,
                    "4xx": { $ref: "#ApiResponse" },
                    "5xx": { $ref: "#ApiResponse" },
                },
            },
            preHandler: (
                req: FastifyRequest<{ Body: RegisterBody }>,
                res,
                done
            ) => {
                const validation = req.validationError;
                if (validation) return schemaValidationError(validation, res);
                done();
            },
        },
        controllerWrapper(register)
    );

    done();
}

export default routes;
