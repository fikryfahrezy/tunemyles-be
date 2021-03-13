# tunemyles-be-v2

## [Description](#description)

Version 2 of Tunemyles Back End (not sure if it's supposed to be v2 or not because there is no additional feature or something else, it's just re-write the code, and restructure the code). This application is `monolithic`. Built with functional paradigm.

## [What has changed?](#what-has-changed)

### [`Language`](#language)

On this v2, the application uses `TypeScript`, while the v1 uses `JavaScript`.

### [`Framework`](#framework)

On this v2, the application uses [Fastify](https://www.fastify.io/), while the v1 uses [Koa](https://koajs.com/).

### [`REST API`](#rest-api)

Some responses for the `GET` method are restructured.

## [Design Pattern](#design-pattern)

This application is designed with the implementation of the `TDD (Test-driven Development)` and `DDD (Domain-driven Design)`.

## [Folder Structure](#folder-tructure)

```
src                                 ->  Application main folder.
|_  api                             ->  Server API folder.
|   |_  middlewares                 ->  API route middleware folder.
|   |   |_  [files].ts              ->  Middleware files.
|   |_  models                      ->  Table or document models folder.
|   |   |_  [databases]             ->  Specified database.
|   |   |   |_ [files].ts           ->  Mapped related database table or document.
|   |_  utils                       ->  API utilities folder.
|   |   |_  [files].ts              ->  Utility files.
|   |_  routes                      ->  API routes folder.
|   |   |_  [routes-name]           ->  Route name folder.
|   |   |   |_  controller.ts       ->  Route controller. Handle client request and send feedback to client.
|   |   |   |_  index.ts            ->  Router for controllers.
|   |   |   |_  model.ts            ->  Bridge for service to interact with a database or other resources.
|   |   |   |_  schemas.ts          ->  Route request and response schema.
|   |   |   |_  service.ts          ->  Route handle logic and process.
|   |   |_  index.ts                ->  Every API version entry point. Register API router for each version.
|   |_  index.ts                    ->  API starting point. Register API version entry point.
|   |_  types.ts                    ->  All defined TypeScript types used in API process.
|_  config                          ->  Global or server configuration variables.
|   |_  validateEnv.ts              ->  Validation for needed global variable in application.
|   |_  [files].ts                  ->  Any config files.
|_  databases                       ->  Databases loader folder.
|   |_  [files].ts                  ->  Databases connection configuration.
|_  definitions                     ->  Global JSON-Schema Definition for reusable.
|   |_  index.ts                    ->  Defined structured JSON-Schemas definition to use as a responses route.
|_  utils                           ->  Global (server) utility folder.
|   |_  [files].ts                  ->  Utility config or utility process files.
|_  app.ts                          ->  Server entry point. Fastify server, plugin registering process, global server hook and decorator, and schema definitions.
|_  index.ts                        ->  Application starting point. Contain Fastify server startup and server options, global process exception, environment variable loader, and another loader such as database connection.

```

-   Naming file using `kebab-case` style like on [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html#file-name)
-   Naming import usgin `lowerCamelCase` style like on [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html#file-es-modules)
-   The `API` folder is expected to change the most, so this folder will become a hot area, and getting hotter inside.

## [Application Code Style](#code-style)

-   Using `make-promise-safe` on the top of process, refer to [Fastify documentation](https://www.fastify.io/docs/latest/Getting-Started/#your-first-server).
-   Using asynchronous logger, with Pino logger, and handle [Log loss prevention](https://getpino.io/#/docs/asynchronous?id=log-loss-prevention) and [Reopening log files](https://getpino.io/#/docs/help?id=reopening-log-files).
-   Configure Fastify option on root `index.ts`, and other application loader.
-   Use [setNotFoundHandler](https://www.fastify.io/docs/latest/Server/#setnotfoundhandler) to give feedback to client if requested route not exist.
-   Use [setErrorHandler](https://www.fastify.io/docs/latest/Server/#seterrorhandler) to [centralize error handler](https://github.com/goldbergyoni/nodebestpractices#-24-handle-errors-centrally-not-within-a-middleware)
-   Could use [Encapsulation](https://www.fastify.io/docs/latest/Encapsulation/) if necessary, could set in global if all server needed or on the specified plugin or scope.
-   Always call `done()` function after registering [custom plugin](https://www.fastify.io/docs/latest/Plugins/).
-   Using schema (`JSON-Schema`) as recommended by Fastify on they [Core Features](https://www.fastify.io/).
-   Preferred using `JSON-Schema` rather than using [Fluent Schema](https://www.fastify.io/docs/latest/Fluent-Schema/).
-   Write schema definition close to another same `schema definition` (schema grouping). For example, the `schema definition` that used for `Params` is written on the `top` of the definition. For example all keys for `<prefix>Param` on the top and all keys for `Get<postfix>` on the bottom, etc. Use key identifier for definition used where, `<prefix>Header` mean used for `header`, `<prefix>Query` used for `query`, `Get<postfix>` for `responses`, etc, and just `<key-name>` for shared definition which mean can used on `header`, `param`, etc.
-   [Preferred async function](https://github.com/goldbergyoni/nodebestpractices#-311-use-async-await-avoid-callbacks) if possible.
-   Using [Ajv schema](https://www.fastify.io/docs/latest/Fluent-Schema/) validation for validate client request.
-   Using [ajv-errors](https://www.fastify.io/docs/latest/Validation-and-Serialization/#schemaerrorformatter) to add custom message for client request validation.
-   Preferred [using arrow function](https://github.com/goldbergyoni/nodebestpractices#-312-use-arrow-function-expressions-) if possible and doesn't need `this` keyword. Because in Fastify there is several function handler that more good with `normal function` because use `this` and there is more good using `arrow function`.
-   Preferred using `arrow function` for function handler on [Fastify Hooks](https://www.fastify.io/docs/latest/Hooks/.#preparsing)
-   Preferred using `normal function` for function handler on [Fastify Routes](https://www.fastify.io/docs/latest/Routes/).
-   Authentication route level specified on [preValidation route option](https://www.fastify.io/docs/latest/Routes/).
-   Use `reply.send()` for [response](https://www.fastify.io/docs/latest/Routes/#async-await)
-   [optional] Declare `import from <dependencies>` above `import from <custom-module/file>`
-   [optional] Declare `import from <most outer custom-module/file>` above `import from <closest custom-module/file>`
-   [optional] Declare `import type` above `import`

## [Resources](#resources)

This application structure, architecture, or style reference to this source:

### [goldbergyoni/nodebestpractices](https://github.com/goldbergyoni/nodebestpractices#4-testing-and-overall-quality-practices)

Adopt the following check (for now):

-   [1.2 Layer your components, keep the web layer within its boundaries](https://github.com/goldbergyoni/nodebestpractices#-12-layer-your-components-keep-the-web-layer-within-its-boundaries)
-   [1.3 Wrap common utilities as npm packages](https://github.com/goldbergyoni/nodebestpractices#-13-wrap-common-utilities-as-npm-packages)
-   [1.4 Separate Express 'app' and 'server'](https://github.com/goldbergyoni/nodebestpractices#-14-separate-express-app-and-server)
-   [1.5 Use environment aware, secure and hierarchical config](https://github.com/goldbergyoni/nodebestpractices#-15-use-environment-aware-secure-and-hierarchical-config)
-   [2.1 Use Async-Await or promises for async error handling](https://github.com/goldbergyoni/nodebestpractices#-21-use-async-await-or-promises-for-async-error-handling)
-   [2.4 Handle errors centrally, not within a middleware](https://github.com/goldbergyoni/nodebestpractices#-24-handle-errors-centrally-not-within-a-middleware)
-   [2.5 Document API errors using Swagger or GraphQL](https://github.com/goldbergyoni/nodebestpractices#-25-document-api-errors-using-swagger-or-graphql)
-   [2.7 Use a mature logger to increase error visibility](https://github.com/goldbergyoni/nodebestpractices#-27-use-a-mature-logger-to-increase-error-visibility)
-   [2.8 Test error flows using your favorite test framework](https://github.com/goldbergyoni/nodebestpractices#-27-use-a-mature-logger-to-increase-error-visibility)
-   [2.10 Catch unhandled promise rejections](https://github.com/goldbergyoni/nodebestpractices#-27-use-a-mature-logger-to-increase-error-visibility)
-   [2.11 Fail fast, validate arguments using a dedicated library](https://github.com/goldbergyoni/nodebestpractices#-27-use-a-mature-logger-to-increase-error-visibility)
-   [2.12 Always await promises before returning to avoid a partial stacktrace](https://github.com/goldbergyoni/nodebestpractices#-27-use-a-mature-logger-to-increase-error-visibility)
-   [3.11 Use Async Await, avoid callbacks](https://github.com/goldbergyoni/nodebestpractices#-311-use-async-await-avoid-callbacks)
-   [3.12 Use arrow function expressions (=>)](https://github.com/goldbergyoni/nodebestpractices#-312-use-arrow-function-expressions-)
-   [4.1 At the very least, write API (component) testing](https://github.com/goldbergyoni/nodebestpractices#-41-at-the-very-least-write-api-component-testing)
-   [4.2 Include 3 parts in each test name](https://github.com/goldbergyoni/nodebestpractices#-42-include-3-parts-in-each-test-name)
-   [4.3 Structure tests by the AAA pattern](https://github.com/goldbergyoni/nodebestpractices#-43-structure-tests-by-the-aaa-pattern)
-   [4.5 Avoid global test fixtures and seeds, add data per-test](https://github.com/goldbergyoni/nodebestpractices#-45-avoid-global-test-fixtures-and-seeds-add-data-per-test)
-   [4.8 Check your test coverage, it helps to identify wrong test patterns](https://github.com/goldbergyoni/nodebestpractices#-48-check-your-test-coverage-it-helps-to-identify-wrong-test-patterns)
-   [4.13 Test your middlewares in isolation](https://github.com/goldbergyoni/nodebestpractices#-413-test-your-middlewares-in-isolation)

### [jbuget / nodejs-clean-architecture-app](https://github.com/jbuget/nodejs-clean-architecture-app)

### [The Clean Code Blog](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

### [fastify / fastify-example-twitter](https://github.com/fastify/fastify-example-twitter)
