import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { PrometheusService } from '../services/prometheus.service.js';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly prometheusService: PrometheusService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const route = request.route?.path ?? request.path ?? 'unknown';
        const durationInSeconds = (Date.now() - now) / 1000;

        this.prometheusService.sendMetrics
          .labels(route)
          .observe(durationInSeconds);
      }),
    );
  }
}
