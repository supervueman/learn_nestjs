import { ReviewModel } from './review.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';

@Module({
  controllers: [ReviewController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ReviewModel,
        schemaOptions: {
          collection: 'review',
        },
      },
    ]),
  ],
})
export class ReviewModule {}
