import {
  BadRequestException,
  Catch,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';
import { ValidationError } from 'sequelize';

@Catch(ValidationError)
export class SequelizeValidationExceptionFilter implements ExceptionFilter {
  logger = new Logger(this.constructor.name);

  catch(exception: ValidationError): void {
    const messages = exception.errors.map(({ message }) => message);

    this.logger.error(messages);

    throw new BadRequestException(messages);
  }
}
