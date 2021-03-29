import {
    FastifyInstance,
    FastifyPluginOptions,
    HookHandlerDoneFunction,
} from "fastify";
import { exampleProtect, protect } from "./middlewares/protect-route";
import { sequelizeQuerying } from "./middlewares/db-querying";
import { routeV2 } from "./routes";

async function api(
    instance: FastifyInstance,
    _: FastifyPluginOptions,
    done: HookHandlerDoneFunction
): Promise<void> {
    instance.decorate("exampleProtect", exampleProtect);
    instance.decorate("userProtect", protect("user"));
    instance.decorate("merchantProtect", protect("merchant"));
    instance.decorate("adminProtect", protect("admin"));
    instance.decorate("sequelizeQuerying", sequelizeQuerying);
    instance.register(routeV2, { prefix: "/v2" });
    done();
}
export default api;
