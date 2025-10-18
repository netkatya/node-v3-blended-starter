import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from "helmet";

import {errors} from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import productsRouter from './routes/productsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(helmet())
app.use(cookieParser());

app.use('/products', productsRouter);
app.use(authRoutes)

// heandle 404
app.use(notFoundHandler);

// handle celebrate errors
app.use(errors());

// handle errors
app.use(errorHandler);


await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
