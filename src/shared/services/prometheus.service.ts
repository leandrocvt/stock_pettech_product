import { Injectable } from '@nestjs/common';
import { Histogram } from '@prometheus-io/client';
import { InjectMetric } from '@willsoto/nestjs-prometheus';

@Injectable()
export class PrometheusService {
  constructor(
    @InjectMetric('http_request_duration_seconds')
    private readonly httpRequestDurationSeconds: Histogram<string>,
  ) {}

  get sendMetrics() {
    return this.httpRequestDurationSeconds;
  }
}
