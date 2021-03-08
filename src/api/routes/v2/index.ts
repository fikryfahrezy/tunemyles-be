import {
    FastifyInstance,
    FastifyPluginOptions,
    HookHandlerDoneFunction,
} from "fastify";
import helloWorld from "./hello-world";
import example from "./example";

async function api(
    instance: FastifyInstance,
    _: FastifyPluginOptions,
    done: HookHandlerDoneFunction
): Promise<void> {
    instance.register(helloWorld);
    instance.register(example);
    done();
}
export default api;
