import { UserEmail } from './../decorators/user-email';
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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-product/:productId')
  async getByProduct(
    @Param('productId') productId: string,
    @UserEmail() email: string,
  ) {
    console.log(email);
    return this.reviewService.findByProductId(productId);
  }

  @UseGuards(JwtAuthGuard)
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
