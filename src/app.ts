import fastify, { FastifyServerOptions, FastifyInstance } from "fastify";
import fastifyCors from "fastify-cors";
import fastifyHelmet from "fastify-helmet";
import fastifyStatic from "fastify-static";
import fastifyMultipart from "fastify-multipart";
import fastifySwagger from "fastify-swagger";
import fastifyRateLimit from "fastify-rate-limit";
import { fastifyRequestContextPlugin } from "fastify-request-context";
import fastifySensible from "fastify-sensible";
import fastifyCookie from "fastify-cookie";
import path from "path";
import middie from "middie";
import inputValidation from "openapi-validator-middleware";
import { components } from "./schemas/definitions.json";
import api from "./api";

function app(opts: FastifyServerOptions = {}): FastifyInstance {
  const app = fastify(opts);
  const ENV = process.env.NODE_ENV;
  const schemas = components.schemas as { [k: string]: unknown };

  inputValidation.init("./docs/v2docs-3.yaml", {
    framework: "fastify",
  });

  for (const key in schemas) {
    if (Object.prototype.hasOwnProperty.call(schemas, key)) {
      const element = schemas[key];
      app.addSchema(element);
    }
  }

  app.setNotFoundHandler(function (_, reply) {
    const data = {
      code: 404,
      success: false,
      message: "not found",
    };
    reply.header("Content-Type", "application/json; charset=utf-8").send(data);
  });

  app.setErrorHandler(function (error, _, reply) {
    const { message, statusCode } = error;
    this.log.error(message);
    const status = statusCode || 500;
    const data = {
      code: status,
      success: false,
      message: message,
    };

    reply.status(status).send(data);
  });

  app.addHook("onClose", (_, done) => {
    done();
  });

  app.register(middie);
  app.register(fastifySensible, { errorHandler: false });
  app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: "1 minute",
  });
  app.register(fastifyCors);
  app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, "data:", "validator.swagger.io"],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
  app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
  });
  app.register(fastifySwagger, {
    routePrefix: "/documentation",
    exposeRoute: ENV === "development" ? true : false,
    mode: "static",
    specification: {
      path: "./docs/v2docs-3.yaml",
      postProcessor: function (swaggerObject) {
        return swaggerObject;
      },
      baseDir: "",
    },
  });
  app.register(fastifyStatic, {
    root: path.join(__dirname, "..", "public"),
    prefix: "/public/",
  });
  app.register(fastifyMultipart, {
    throwFileSizeLimit: true,
    addToBody: true,
    sharedSchemaId: "#multiPartSchema",
  });
  app.register(inputValidation.validate({}));
  app.register(fastifyRequestContextPlugin, {
    defaultStoreValues: {
      user: { id: "system" },
    },
  });

  app.register(api, { prefix: "/api" });

  return app;
}

export default app;
