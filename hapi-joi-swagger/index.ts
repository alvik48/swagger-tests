import * as Hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as HapiSwagger from 'hapi-swagger';

import * as Package from './package.json';

import routes from './routes'

const server: Hapi.Server = new Hapi.Server({
  host: 'localhost',
  port: 3000,
  router: {
    stripTrailingSlash: true
  },
  routes: {
    cors: {
      origin: ['*'], // an array of origins or 'ignore'
      maxAge: 60,
      credentials: true // boolean - 'Access-Control-Allow-Credentials'
    }
  }
});

(async (): Promise<void> => {
  await server.register([
    { plugin: Inert },
    { plugin: Vision },
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: `API documentation`,
          version: Package.version
        },
        grouping: 'tags',
        auth: false,
        securityDefinitions: {
          bearer: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
          }
        },
      }
    }
  ]);

  server.route(routes);

  server.events.on('response', ({info, method, path, response }: Hapi.Request) => {
    console.info(`[${info.remoteAddress}] ${method.toUpperCase()}: ${path} --> ${(response as Hapi.ResponseObject).statusCode}`);
  });

  await server.start();
  console.log('Server running on http://localhost:3000');
})();
