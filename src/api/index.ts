import {
    FastifyInstance,
    FastifyPluginOptions,
    HookHandlerDoneFunction,
} from "fastify";
import {
    exampleProtect,
    adminProtect,
    userProtect,
    merchantProtect,
} from "./middlewares/protect-route";
import { sequelizeQuerying } from "./middlewares/db-querying";
import { routeV2 } from "./routes";

async function api(
    instance: FastifyInstance,
    _: FastifyPluginOptions,
    done: HookHandlerDoneFunction
): Promise<void> {
    instance.decorate("exampleProtect", exampleProtect);
    instance.decorate("userProtect", userProtect);
    instance.decorate("merchantProtect", merchantProtect);
    instance.decorate("adminProtect", adminProtect);
    instance.decorate("sequelizeQuerying", sequelizeQuerying);
    instance.register(routeV2, { prefix: "/v2" });
    done();
}
export default api;
