import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import { config } from '@/config';
import { logger } from '@/utils/logger';
import { helmetConfig, corsConfig, rateLimitConfig } from '@/middleware/security.middleware';
import { errorHandler, notFoundHandler } from '@/middleware/error.middleware';
import { transformersRouter } from '@/routes/transformers.routes';

export const createApp = (): express.Application => {
  const app = express();

  // Trust proxy for accurate IP addresses
  app.set('trust proxy', 1);

  // Security middleware
  app.use(helmetConfig);
  app.use(corsConfig);
  app.use(rateLimitConfig);

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Compression middleware
  app.use(compression());

  // Custom Morgan format for structured logging
  const morganFormat =
    config.env === 'production'
      ? 'combined'
      : ':method :url :status :res[content-length] - :response-time ms';

  app.use(
    morgan(morganFormat, {
      stream: {
        write: (message: string) => {
          logger.info(message.trim());
        },
      },
    })
  );

  // API routes
  app.use(`/api/${config.apiVersion}`, transformersRouter);

  // Root endpoint
  app.get('/', (req, res) => {
    res.json({
      status: 'SUCCESS',
      message: 'Transformers API is running!',
      version: config.app.version,
      apiVersion: config.apiVersion,
      endpoints: {
        health: `/api/${config.apiVersion}/health`,
        random: `/api/${config.apiVersion}/random?count=5`,
        search: `/api/${config.apiVersion}/search?q=optimus`,
        all: `/api/${config.apiVersion}/all`,
        stats: `/api/${config.apiVersion}/stats`,
      },
      timestamp: new Date().toISOString(),
    });
  });

  // 404 handler
  app.use(notFoundHandler);

  // Global error handler (must be last)
  app.use(errorHandler);

  return app;
};
