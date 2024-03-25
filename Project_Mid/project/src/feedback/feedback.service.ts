import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) {}

  async createFeedback(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const feedback = this.feedbackRepository.create(createFeedbackDto);
    return this.feedbackRepository.save(feedback);
  }

  async findAllFeedback(): Promise<Feedback[]> {
    return this.feedbackRepository.find();
  }

  async findFeedbackById(feed_id: number): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findOne({where:{feed_id}});
    if (!feedback) {
      throw new NotFoundException('Feedback not found');
    }
    return feedback;
  }

  async deleteFeedback(feed_id: number): Promise<void> {
    const feedback = await this.findFeedbackById(feed_id);
    await this.feedbackRepository.remove(feedback);
  }
}
