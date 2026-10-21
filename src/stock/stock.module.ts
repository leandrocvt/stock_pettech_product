import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema.js';
import { ProductMongooseRepository } from './repositories/mongoose/product.mongoose.repository.js';
import { ProductRepository } from './repositories/product.repository.js';
import { StockService } from './services/stock.service.js';
import { StockController } from './controllers/strock.controller.js';
import { makeHistogramProvider } from '@willsoto/nestjs-prometheus';
import { LoggingInterceptor } from '../shared/interceptors/looging.interceptor.js';
import { PrometheusService } from '../shared/services/prometheus.service.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  providers: [
    {
      provide: ProductRepository,
      useClass: ProductMongooseRepository,
    },
    StockService,
    LoggingInterceptor,
    PrometheusService,
    makeHistogramProvider({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['route'],
      buckets: [0.1, 0.3, 1, 1.5, 2, 3, 5],
    }),
  ],
  controllers: [StockController],
})
export class StockModule {}
