/**
 * Monitoring and observability setup
 * Integrates with popular monitoring services
 */

// Types for monitoring data
export interface MetricData {
  name: string;
  value: number;
  unit?: 'ms' | 'count' | 'bytes' | 'percent';
  tags?: Record<string, string>;
  timestamp?: number;
}

export interface ErrorData {
  error: Error | string;
  context?: Record<string, any>;
  user?: {
    id: string;
    email?: string;
  };
  request?: {
    method: string;
    url: string;
    userAgent?: string;
    ip?: string;
  };
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

// Monitoring service interface
interface MonitoringService {
  recordMetric(metric: MetricData): void;
  recordError(errorData: ErrorData): void;
  startTransaction(name: string): Transaction;
}

interface Transaction {
  setTag(key: string, value: string): void;
  finish(): void;
}

// Simple in-memory implementation for development
class SimpleMonitoring implements MonitoringService {
  recordMetric(metric: MetricData): void {
    console.log(`[METRIC] ${metric.name}: ${metric.value}${metric.unit || ''}`, metric.tags);
  }

  recordError(errorData: ErrorData): void {
    console.error(`[ERROR] ${errorData.severity?.toUpperCase() || 'ERROR'}:`, {
      error: errorData.error,
      context: errorData.context,
      user: errorData.user?.id,
      request: errorData.request?.url,
    });
  }

  startTransaction(name: string): Transaction {
    const start = Date.now();
    console.log(`[TRANSACTION] Started: ${name}`);

    return {
      setTag: (key: string, value: string) => {
        console.log(`[TRANSACTION] Tag: ${key}=${value}`);
      },
      finish: () => {
        const duration = Date.now() - start;
        console.log(`[TRANSACTION] Finished: ${name} (${duration}ms)`);
      },
    };
  }
}

// Sentry implementation (when available)
class SentryMonitoring implements MonitoringService {
  private sentry: any;

  constructor() {
    try {
      // Dynamic import to avoid errors if Sentry is not installed
      this.sentry = require('@sentry/node');
    } catch (error) {
      console.warn('Sentry not available, falling back to simple monitoring');
      this.sentry = null;
    }
  }

  recordMetric(metric: MetricData): void {
    if (!this.sentry) return;

    // Sentry metrics (if available in your plan)
    this.sentry.metrics?.increment(metric.name, metric.value, {
      tags: metric.tags,
    });
  }

  recordError(errorData: ErrorData): void {
    if (!this.sentry) {
      console.error('[SENTRY FALLBACK]', errorData);
      return;
    }

    this.sentry.withScope((scope: any) => {
      if (errorData.user) {
        scope.setUser({
          id: errorData.user.id,
          email: errorData.user.email,
        });
      }

      if (errorData.request) {
        scope.setContext('request', errorData.request);
      }

      if (errorData.context) {
        Object.entries(errorData.context).forEach(([key, value]) => {
          scope.setTag(key, String(value));
        });
      }

      if (errorData.severity) {
        scope.setLevel(errorData.severity as any);
      }

      if (typeof errorData.error === 'string') {
        this.sentry.captureMessage(errorData.error);
      } else {
        this.sentry.captureException(errorData.error);
      }
    });
  }

  startTransaction(name: string): Transaction {
    if (!this.sentry) {
      return {
        setTag: () => {},
        finish: () => {},
      };
    }

    const transaction = this.sentry.startTransaction({ name });

    return {
      setTag: (key: string, value: string) => {
        transaction.setTag(key, value);
      },
      finish: () => {
        transaction.finish();
      },
    };
  }
}

// Initialize monitoring service
function createMonitoringService(): MonitoringService {
  if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
    return new SentryMonitoring();
  }
  return new SimpleMonitoring();
}

export const monitoring = createMonitoringService();

// Convenience functions
export function recordMetric(name: string, value: number, options?: {
  unit?: MetricData['unit'];
  tags?: Record<string, string>;
}) {
  monitoring.recordMetric({
    name,
    value,
    unit: options?.unit,
    tags: options?.tags,
    timestamp: Date.now(),
  });
}

export function recordError(error: Error | string, options?: {
  context?: Record<string, any>;
  user?: ErrorData['user'];
  request?: ErrorData['request'];
  severity?: ErrorData['severity'];
}) {
  monitoring.recordError({
    error,
    context: options?.context,
    user: options?.user,
    request: options?.request,
    severity: options?.severity || 'medium',
  });
}

export function withTransaction<T>(name: string, fn: (transaction: Transaction) => T): T {
  const transaction = monitoring.startTransaction(name);
  try {
    const result = fn(transaction);
    transaction.finish();
    return result;
  } catch (error) {
    recordError(error as Error, {
      context: { transaction: name },
      severity: 'high',
    });
    transaction.finish();
    throw error;
  }
}

// Performance monitoring middleware
export function createPerformanceMiddleware(name: string) {
  return function performanceWrapper<T extends (...args: any[]) => any>(
    target: T
  ): T {
    return (async (...args: any[]) => {
      const start = Date.now();
      const transaction = monitoring.startTransaction(name);

      try {
        const result = await target(...args);
        const duration = Date.now() - start;

        recordMetric(`${name}.duration`, duration, { unit: 'ms' });
        recordMetric(`${name}.success`, 1, { unit: 'count' });

        transaction.setTag('status', 'success');
        transaction.finish();

        return result;
      } catch (error) {
        const duration = Date.now() - start;

        recordMetric(`${name}.duration`, duration, { unit: 'ms' });
        recordMetric(`${name}.error`, 1, { unit: 'count' });

        transaction.setTag('status', 'error');
        transaction.finish();

        recordError(error as Error, {
          context: { operation: name, duration },
          severity: 'high',
        });

        throw error;
      }
    }) as T;
  };
}

// Database query monitoring
export function monitorDatabaseQuery(operation: string, collection?: string) {
  return createPerformanceMiddleware(`db.${operation}${collection ? `.${collection}` : ''}`);
}

// API endpoint monitoring
export function monitorApiEndpoint(method: string, path: string) {
  return createPerformanceMiddleware(`api.${method.toLowerCase()}.${path.replace(/[^a-zA-Z0-9]/g, '_')}`);
}

// Memory usage monitoring
export function recordMemoryUsage() {
  const usage = process.memoryUsage();
  recordMetric('memory.rss', usage.rss, { unit: 'bytes' });
  recordMetric('memory.heapUsed', usage.heapUsed, { unit: 'bytes' });
  recordMetric('memory.heapTotal', usage.heapTotal, { unit: 'bytes' });
  recordMetric('memory.external', usage.external, { unit: 'bytes' });
}

// System metrics collection (call periodically)
export function startSystemMetricsCollection() {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  // Collect system metrics every 30 seconds
  setInterval(() => {
    recordMemoryUsage();
    recordMetric('uptime', process.uptime(), { unit: 'ms' });

    // CPU usage (if available)
    const usage = process.cpuUsage();
    recordMetric('cpu.user', usage.user, { unit: 'ms' });
    recordMetric('cpu.system', usage.system, { unit: 'ms' });
  }, 30000);
}