import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema.js';
import { ProductMongooseRepository } from './repositories/mongoose/product.mongoose.repository.js';
import { ProductRepository } from './repositories/product.repository.js';
import { StockService } from './services/stock.service.js';
import { StockController } from './controllers/strock.controller.js';

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
  ],
  controllers: [StockController],
})
export class StockModule {}
