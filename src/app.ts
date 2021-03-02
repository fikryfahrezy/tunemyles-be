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
import fastifyAuth from "fastify-auth";
import Ajv from "ajv";
import AjvErrors from "ajv-errors";
import path from "path";
import middie from "middie";
import definitions from "./definitions";
import api from "./api";

function app(opts: FastifyServerOptions = {}): FastifyInstance {
  const app = fastify(opts);
  const ajv = new Ajv({ allErrors: true });
  const ajvErrors = AjvErrors(ajv);
  const ENV = process.env.NODE_ENV;
  const schemas = definitions.components.schemas as { [k: string]: unknown };

  for (const key in schemas) {
    if (Object.prototype.hasOwnProperty.call(schemas, key)) {
      const element = schemas[key];
      app.addSchema(element);
    }
  }

  app.setValidatorCompiler(({ schema }) => {
    const validate = ajvErrors.compile(schema);
    return validate;
  });

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
      message,
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
    sharedSchemaId: "#MultiPartSchema",
  });
  app.register(fastifyAuth);
  app.register(fastifyRequestContextPlugin, {
    defaultStoreValues: {
      user: null,
      query: null,
    },
  });

  app.register(api, { prefix: "/api" });

  return app;
}

export default app;
