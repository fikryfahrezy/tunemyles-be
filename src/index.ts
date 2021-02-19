require("make-promises-safe");
import dotenv from "dotenv";
import pino from "pino";
dotenv.config();

import app from "./app";
import { sequelizeConnect } from "./config/mysqlDb";
import logger, { dest } from "./utils/logger";
import validateEnv from "./utils/validateEnv";

const PORT = process.env.PORT;
const server = app({ logger: true });

const start = async () => {
  try {
    const { error } = validateEnv(process.env);
    if (error) throw error;

    await sequelizeConnect();
    await server.listen({ port: Number(PORT), host: "::" });
    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log(address, port);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();

// asynchronously flush every 10 seconds to keep the buffer empty
// in periods of low activity
setInterval(function () {
  logger.flush();
}, 10000).unref();

// use pino.final to create a special logger that
// guarantees final tick writes
const handler = pino.final(logger, (err, finalLogger, evt) => {
  finalLogger.info(`${evt} caught`);
  if (err) finalLogger.error(err, "error caused exit");
  process.exit(err ? 1 : 0);
});

process.on("SIGHUP", () => {
  console.log("hi");
  dest.reopen();
});

// catch all the ways node might exit
process.on("beforeExit", () => handler(null, "beforeExit"));
process.on("exit", () => handler(null, "exit"));
process.on("uncaughtException", (err) => handler(err, "uncaughtException"));
process.on("SIGINT", () => handler(null, "SIGINT"));
process.on("SIGQUIT", () => handler(null, "SIGQUIT"));
process.on("SIGTERM", () => handler(null, "SIGTERM"));
