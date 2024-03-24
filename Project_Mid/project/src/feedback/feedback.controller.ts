import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { Feedback } from './feedback.entity';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  createFeedback(@Body() feedback: Feedback): Promise<Feedback> {
    return this.feedbackService.createFeedback(feedback);
  }

  @Get()
  findAllFeedback(): Promise<Feedback[]> {
    return this.feedbackService.findAllFeedback();
  }

  @Get(':feed_id')
  findFeedbackById(@Param('feed_id') feed_id: number): Promise<Feedback> {
    return this.feedbackService.findFeedbackById(feed_id);
  }

  @Delete(':feed_id')
  deleteFeedback(@Param('feed_id') feed_id: number): Promise<void> {
    return this.feedbackService.deleteFeedback(feed_id);
  }
}
