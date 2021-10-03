import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse();
    const commonJSON = {
      success: false,
      timestamp: new Date().toISOString(),
    };

    response
      .status(status)
      .json(
        typeof error === 'string'
          ? { ...commonJSON, error }
          : { ...commonJSON, ...error },
      );
  }
}
