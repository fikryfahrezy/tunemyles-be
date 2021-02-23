# tunemyles-be-v2

## [Description](#description)

Version 2 of Tunemyles Back End (not sure if it's supposed to be v2 or not because there is no additional feature or something else, it's just re-write the code, and restructure the code). This application is `monolithic`. Built with functional paradigm.

## [What has changed?](#what-has-changed)

### `Language`

On this v2, the application uses `TypeScript`, while the v1 uses `JavaScript`.

### `Framework`

On this v2, the application uses [Fastify](https://www.fastify.io/), while the v1 uses [Koa](https://koajs.com/).

### `REST API`

Some responses for the `GET` method are restructured.

## [How this application structured?](#how-this-application-structured)

```
src                                 ->
|_  api                             ->
|   |_  middlewares                 ->
|   |   |_  [files].ts              ->
|   |_  models                      ->
|   |   |_  sql                     ->
|   |   |   |_ [files].ts           ->
|   |_  schemas                     ->
|   |   |_  request                 ->
|   |   |   |_  body                ->
|   |   |   |   |_ [files].json     ->
|   |   |   |_ headers              ->
|   |   |       |_ [files].json     ->
|   |   |_  responses               ->
|   |   |   |_ [files].json         ->
|   |_  utils                       ->
|   |   |_  [files].ts              ->
|   |_  routes                      ->
|   |   |_ v2                       ->
|   |   |   |_  [routes]            ->
|   |   |   |   |_  controller.ts   ->
|   |   |   |   |_  index.ts        ->
|   |   |   |   |_  model.ts        ->
|   |   |   |   |_  service.ts      ->
|   |   |   |_  index.ts            ->
|   |_  index.ts                    ->
|   |_  types.ts                    ->
|_  config                          ->
|   |_  validateEnv.ts              ->
|_  databases                       ->
|   |_  sequelize.ts                ->
|_  definitions                     ->
|   |_ definitions.json             ->
|_  utils                           ->
|   |_ logger.ts                    ->
|_  app.ts                          ->
|_  index.ts                        ->

```

## [How about the others?](#how-about-the-others)

## Resources

This application structure, architecture, or style reference to this source:

### [goldbergyoni/nodebestpractices](https://github.com/goldbergyoni/nodebestpractices#4-testing-and-overall-quality-practices)

Adopt the following check (for now):

- [1.2 Layer your components, keep the web layer within its boundaries](https://github.com/goldbergyoni/nodebestpractices#-12-layer-your-components-keep-the-web-layer-within-its-boundaries)
- [1.3 Wrap common utilities as npm packages](https://github.com/goldbergyoni/nodebestpractices#-13-wrap-common-utilities-as-npm-packages)
- [1.4 Separate Express 'app' and 'server'](https://github.com/goldbergyoni/nodebestpractices#-14-separate-express-app-and-server)
- [1.5 Use environment aware, secure and hierarchical config](https://github.com/goldbergyoni/nodebestpractices#-15-use-environment-aware-secure-and-hierarchical-config)
- [2.1 Use Async-Await or promises for async error handling](https://github.com/goldbergyoni/nodebestpractices#-21-use-async-await-or-promises-for-async-error-handling)
- [2.4 Handle errors centrally, not within a middleware](https://github.com/goldbergyoni/nodebestpractices#-24-handle-errors-centrally-not-within-a-middleware)
- [2.5 Document API errors using Swagger or GraphQL](https://github.com/goldbergyoni/nodebestpractices#-25-document-api-errors-using-swagger-or-graphql)
- [2.7 Use a mature logger to increase error visibility](https://github.com/goldbergyoni/nodebestpractices#-27-use-a-mature-logger-to-increase-error-visibility)
- [2.8 Test error flows using your favorite test framework](https://github.com/goldbergyoni/nodebestpractices#-27-use-a-mature-logger-to-increase-error-visibility)
- [2.10 Catch unhandled promise rejections](https://github.com/goldbergyoni/nodebestpractices#-27-use-a-mature-logger-to-increase-error-visibility)
- [2.11 Fail fast, validate arguments using a dedicated library](https://github.com/goldbergyoni/nodebestpractices#-27-use-a-mature-logger-to-increase-error-visibility)
- [2.12 Always await promises before returning to avoid a partial stacktrace](https://github.com/goldbergyoni/nodebestpractices#-27-use-a-mature-logger-to-increase-error-visibility)
- [3.11 Use Async Await, avoid callbacks](https://github.com/goldbergyoni/nodebestpractices#-311-use-async-await-avoid-callbacks)
- [4.1 At the very least, write API (component) testing](https://github.com/goldbergyoni/nodebestpractices#-41-at-the-very-least-write-api-component-testing)
- [4.2 Include 3 parts in each test name](https://github.com/goldbergyoni/nodebestpractices#-42-include-3-parts-in-each-test-name)
- [4.3 Structure tests by the AAA pattern](https://github.com/goldbergyoni/nodebestpractices#-43-structure-tests-by-the-aaa-pattern)
- [4.5 Avoid global test fixtures and seeds, add data per-test](https://github.com/goldbergyoni/nodebestpractices#-45-avoid-global-test-fixtures-and-seeds-add-data-per-test)
- [4.8 Check your test coverage, it helps to identify wrong test patterns](https://github.com/goldbergyoni/nodebestpractices#-48-check-your-test-coverage-it-helps-to-identify-wrong-test-patterns)
- [4.13 Test your middlewares in isolation](https://github.com/goldbergyoni/nodebestpractices#-413-test-your-middlewares-in-isolation)

### [jbuget / nodejs-clean-architecture-app](https://github.com/jbuget/nodejs-clean-architecture-app)

### [The Clean Code Blog](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

### [fastify / fastify-example-twitter](https://github.com/fastify/fastify-example-twitter)
