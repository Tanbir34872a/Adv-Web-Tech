import { Controller, Get, Post, Delete, Param, Body, Patch, ValidationPipe } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { Feedback } from './feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async createFeedback(@Body(ValidationPipe) createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    return this.feedbackService.createFeedback(createFeedbackDto);
  }

  @Get()
  async findAllFeedback(): Promise<Feedback[]> {
    return this.feedbackService.findAllFeedback();
  }

  @Get(':feed_id')
  async findFeedbackById(@Param('feed_id') feed_id: number): Promise<Feedback> {
    return this.feedbackService.findFeedbackById(feed_id);
  }

  @Delete(':feed_id')
  async deleteFeedback(@Param('feed_id') feed_id: number): Promise<void> {
    return this.feedbackService.deleteFeedback(feed_id);
  }

}
