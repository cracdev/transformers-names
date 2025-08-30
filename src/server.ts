import { createApp } from './app';
import { config } from '@/config';
import { logger } from '@/utils/logger';

const startServer = async (): Promise<void> => {
  try {
    const app = createApp();

    const server = app.listen(config.port, () => {
      logger.info(`🚀 Transformers API started successfully!`, {
        port: config.port,
        environment: config.env,
        version: config.app.version,
        apiVersion: config.apiVersion,
        logLevel: config.logging.level,
      });

      logger.info(`📖 API Documentation available at: http://localhost:${config.port}`);
      logger.info(
        `🔍 Health check: http://localhost:${config.port}/api/${config.apiVersion}/health`
      );
    });

    // Graceful shutdown handling
    const gracefulShutdown = (signal: string) => {
      logger.info(`${signal} received. Starting graceful shutdown...`);

      server.close(error => {
        if (error) {
          logger.error('Error during server shutdown:', error);
          process.exit(1);
        }

        logger.info('Server closed successfully');
        process.exit(0);
      });

      // Force close after 30 seconds
      setTimeout(() => {
        logger.error('Forced shutdown after 30 seconds');
        process.exit(1);
      }, 30000);
    };

    // Handle process signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught exceptions
    process.on('uncaughtException', (error: Error) => {
      logger.error('Uncaught Exception:', error);
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
      logger.error('Unhandled Rejection at:', { promise, reason });
      process.exit(1);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server if this file is run directly
// ES module equivalent of require.main === module
if (import.meta.url === `file://${process.argv[1]}`) {
  void startServer();
}

export { startServer };
