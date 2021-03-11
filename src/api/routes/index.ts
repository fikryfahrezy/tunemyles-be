import {
    FastifyInstance,
    FastifyPluginOptions,
    HookHandlerDoneFunction,
} from "fastify";
import helloWorld from "./hello-world";
import example from "./example";
import auth from "./auth";

export async function routeV2(
    instance: FastifyInstance,
    _: FastifyPluginOptions,
    done: HookHandlerDoneFunction
): Promise<void> {
    instance.register(helloWorld);
    instance.register(example);
    instance.register(auth);
    done();
}
