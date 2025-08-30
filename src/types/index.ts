export interface ApiResponse<T = any> {
  status: 'SUCCESS' | 'ERROR';
  data?: T;
  message?: string;
  error?: string;
}

export interface TransformerName {
  id: string;
  name: string;
}

export interface RandomNamesRequest {
  count?: number;
}

export interface RandomNamesResponse {
  names: string[];
  total: number;
}

export interface HealthCheckResponse {
  status: 'UP' | 'DOWN';
  timestamp: string;
  uptime: number;
  version: string;
}

export interface ErrorResponse {
  status: 'ERROR';
  error: string;
  message: string;
  timestamp: string;
  path?: string;
}
