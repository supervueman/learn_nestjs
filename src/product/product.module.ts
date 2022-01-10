import { ProductModel } from './product.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';

@Module({
  controllers: [ProductController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ProductModel,
        schemaOptions: {
          collection: 'product',
        },
      },
    ]),
  ],
})
export class ProductModule {}
