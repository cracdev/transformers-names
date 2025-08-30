import { Router } from 'express';
import { TransformersController } from '@/controllers/transformers.controller';
import { heavyEndpointRateLimit } from '@/middleware/security.middleware';

const router = Router();
const transformersController = new TransformersController();

// Health check route
router.get('/health', transformersController.healthCheck);

// Random names endpoint
router.get('/random', transformersController.getRandomNames);

// Search names endpoint
router.get('/search', transformersController.searchNames);

// Get all names endpoint (with stricter rate limiting)
router.get('/all', heavyEndpointRateLimit, transformersController.getAllNames);

// API statistics
router.get('/stats', transformersController.getStats);

export { router as transformersRouter };
