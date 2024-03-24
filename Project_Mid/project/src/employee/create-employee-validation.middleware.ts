import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
      address: Joi.string().required(),
      role: Joi.string().required(),
      utype: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    next();
  }
}
