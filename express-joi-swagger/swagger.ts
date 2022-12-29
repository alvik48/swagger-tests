import { Options } from 'swagger-jsdoc';

const options: Options = {
  apis: ['./routes/*.ts'],
  basePath: '/api',
  swaggerDefinition: {
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A sample API',
    },
  },
};

export default options;
