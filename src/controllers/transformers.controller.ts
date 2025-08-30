import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { TransformersService } from '@/services/transformers.service';
import type { ApiResponse, RandomNamesResponse, HealthCheckResponse } from '@/types';
import { config } from '@/config';

const randomNamesSchema = z.object({
  count: z
    .string()
    .optional()
    .transform(val => (val ? parseInt(val, 10) : 5)),
});

const searchSchema = z.object({
  q: z.string().min(1, 'Query parameter is required'),
});

export class TransformersController {
  private transformersService: TransformersService;

  constructor() {
    this.transformersService = new TransformersService();
  }

  /**
   * Health check endpoint
   */
  public healthCheck = (req: Request, res: Response): void => {
    const response: ApiResponse<HealthCheckResponse> = {
      status: 'SUCCESS',
      data: {
        status: 'UP',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: config.app.version,
      },
    };
    res.json(response);
  };

  /**
   * Get random transformer names
   */
  public getRandomNames = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { count } = randomNamesSchema.parse(req.query);

      const data = this.transformersService.getRandomNames(count);

      const response: ApiResponse<RandomNamesResponse> = {
        status: 'SUCCESS',
        data,
        message: `Retrieved ${data.total} random transformer names`,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Search transformer names
   */
  public searchNames = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { q } = searchSchema.parse(req.query);

      const names = this.transformersService.searchNames(q);

      const response: ApiResponse<{ names: string[]; total: number; query: string }> = {
        status: 'SUCCESS',
        data: {
          names,
          total: names.length,
          query: q,
        },
        message: `Found ${names.length} transformer names matching "${q}"`,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get all transformer names
   */
  public getAllNames = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const names = this.transformersService.getAllNames();

      const response: ApiResponse<{ names: string[]; total: number }> = {
        status: 'SUCCESS',
        data: {
          names,
          total: names.length,
        },
        message: `Retrieved all ${names.length} transformer names`,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get API statistics
   */
  public getStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const totalCount = this.transformersService.getTotalCount();

      const response: ApiResponse<{ totalNames: number; apiVersion: string }> = {
        status: 'SUCCESS',
        data: {
          totalNames: totalCount,
          apiVersion: config.apiVersion,
        },
        message: 'API statistics retrieved successfully',
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  };
}
