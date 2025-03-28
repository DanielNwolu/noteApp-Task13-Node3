// File: src/app.ts (update to include Swagger UI)
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './config/swagger';
import noteRoutes from './routes/noteRoutes';
import authRoutes from './routes/authRoutes'
import categoryRoutes from './routes/categoryRoutes';
import { errorHandler } from './middleware/errorMiddleware';
import { requestLogger } from './middleware/loggingMiddleware';
import { NotFoundError } from './utils/errorClasses';
import userRoutes from './routes/userRoutes';


const app: Application = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation route
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Note-Taking API Documentation'
}));

// API routes
app.use('/api/notes', noteRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

// Handle undefined routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Cannot find ${req.originalUrl} on this server`));
});

// Global error handler
app.use(errorHandler);

// Request logger
app.use(requestLogger);

export default app;