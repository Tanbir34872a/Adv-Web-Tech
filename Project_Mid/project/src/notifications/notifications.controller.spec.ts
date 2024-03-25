import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from './notifications.controller';
import { NotificationService } from './notifications.service';

describe('NotificationsController', () => {
  let controller: NotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [NotificationService],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
