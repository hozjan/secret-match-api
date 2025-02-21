import {
  HttpException,
  ExceptionFilter,
  Catch,
  ArgumentsHost
} from '@nestjs/common';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const message = exception.getResponse();

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url
    });
  }
}
