import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './swagger';

const app = express();

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// other middleware and routes go here

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
