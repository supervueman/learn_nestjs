import { Types } from 'mongoose';
import { REVIEW_NOT_FOUND } from './review.constatnts';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/createReview.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('create')
  async createTest(@Body() dto: CreateReviewDto) {
    return this.reviewService.create({
      name: 'Test',
      title: 'Title',
      description: 'Description',
      rating: 5,
      productId: new Types.ObjectId().toHexString(),
    });
  }

  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Get('by-product/:productId')
  async getByProduct(@Param('productId') productId: string) {
    return this.reviewService.findByProductId(productId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.reviewService.delete(id);

    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    this.reviewService.deleteByProductId(deletedDoc.productId);

    return deletedDoc;
  }
}
