import express from 'express';
import cors from 'cors';
import studentsRoutes from './routes/notesRoutes.js';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

export const app = express();
const PORT = process.env.PORT ?? 3000;

// ? Middleware
app.use(logger);
app.use(
  express.json({
    type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb',
  }),
);
app.use(cors());

// ? Routes
app.use(studentsRoutes);

// ! Error middleware
app.use(notFoundHandler);
app.use(errorHandler);

// ? Server listen
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
