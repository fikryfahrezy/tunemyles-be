import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from "fastify";
import {
  adminProtect,
  userProtect,
  merchantProtect,
} from "./middlewares/protect-rooute";
import { sequelizeQuerying } from "./middlewares/db-querying";
import type { FastifyFn } from "./types";
declare module "fastify" {
  interface FastifyInstance {
    userProtect: FastifyFn;
  }
}

import versionTwo from "./routes/v2";

async function api(
  instance: FastifyInstance,
  _: FastifyPluginOptions,
  done: HookHandlerDoneFunction
): Promise<void> {
  instance.decorate("userProtect", userProtect);
  instance.decorate("merchantProtect", merchantProtect);
  instance.decorate("adminProtect", adminProtect);
  instance.decorate("sequelizeQuerying", sequelizeQuerying);
  instance.register(versionTwo, { prefix: "/v2" });
  done();
}
export default api;
