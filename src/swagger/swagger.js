import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';

// Нужно, чтобы корректно вычислить абсолютные пути
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Shop API',
      version: '1.0.0',
      description: 'Documents REST API',
    },
    servers: [
      {
        url: 'node-v3-blended-starter.onrender.com',
      },
    ],
  },


  apis: [
    path.join(__dirname, '../routes/*.js'),
    path.join(__dirname, './*.js'),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app, port) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📘 Server running on port http://localhost:${port}/api-docs`);
}
