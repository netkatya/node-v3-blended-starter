import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(logger);
app.use(express.json());
app.use(cors());

// Routes

// heandle 404
app.use(notFoundHandler);

// handle errors
app.use(errorHandler);

await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
