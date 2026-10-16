import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ProductRepository } from '../product.repository.js';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../schemas/product.schema.js';
import { IProduct } from '../../schemas/models/product.interface.js';

@Injectable()
export class ProductMongooseRepository implements ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  getAllStock(limit: number, page: number): Promise<IProduct[]> {
    const offset = (page - 1) * limit;
    return this.productModel.find().skip(offset).limit(limit).exec();
  }

  async getStock(productId: string): Promise<IProduct> {
    const product = await this.productModel.findById(productId).exec();

    if (!product) {
      throw new Error(`Product with id ${productId} not found`);
    }

    return product;
  }

  async createStock(product: IProduct): Promise<void> {
    const createStock = new this.productModel(product);

    await createStock.save();
  }

  async updateStock(productId: string, stock: number): Promise<void> {
    await this.productModel
      .updateOne({ _id: productId }, { quantity: stock })
      .exec();
  }

  async deleteStock(productId: string): Promise<void> {
    await this.productModel.deleteOne({ _id: productId }).exec();
  }
}
