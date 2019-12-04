# Boilerplate API with Koa 2

## Get Started

```
npm start
```

## Test

```
npm test
```

## Structure

```
app
├── config.json
├── index.js
├── middlewares
├── resources
│   ├── resourceX
│   │   ├── authorizations.js
│   │   ├── controller.js
│   │   ├── index.js
│   │   ├── mailer.js
│   │   ├── model.js
│   │   ├── routes.js
│   │   └── validations.js
│   └── index.js
├── routes
├── services
└── views
```

## Features

- Routing with `koa-router`
- Synchronous validation with `joi` of the `params`, `headers`, `body` and `query` received and custom middleware for Asynchronous validation
- Authentication with `koa-passport`, `passport-jwt` thus support JWT Authentication
- Authorization with a simple to use custom middleware
- async/await and Promise to serve you everywhere
- Global error handler `middlewares/error-handler`
- Models with `mongoose` the great ODM for MongoDB
- Handle graceful stop with health check endpoint (`/health`) for your load balancer
- Consistent response error for validation error, authentication error and authorization error thanks to the `boom` module
- Configuration via `config.json` file (lowest precedence), command arguments and system environment variables (highest precedence)
- Template engine (nunjucks) setup and ready to use via `ctx.render` with supports for templates, blocks and partials
- Mailers ready to use per resource with easy email templating with MJML and nunjucks
- Setup to start test suite with `mocha` and `chai`
- Setup to run MongoDB migrations
- Yarn as package manager

## TODO

- Auto-generated REST API Documentation with swagger
- GraghQL endpoint
