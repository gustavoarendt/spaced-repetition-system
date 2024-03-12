import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { RequestWithUser } from 'src/modules/auth/auth/auth.guard';

@Injectable()
export class GlobalLoggerInterceptor implements NestInterceptor {
  constructor(private consoleLogger: ConsoleLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();

    const request = httpContext.getRequest<Request | RequestWithUser>();
    const { method, url } = request;
    const { statusCode } = httpContext.getResponse<Response>();

    this.consoleLogger.log(`[${method}] ${url}`);

    const preControllerTime = Date.now();
    return next.handle().pipe(
      tap(() => {
        if ('user' in request) {
          this.consoleLogger.log(
            `Request made by user: [${request.user.username}] to [${request.url}]`,
          );
        }
        const executionTime = Date.now() - preControllerTime;
        this.consoleLogger.log(
          `Response: status: ${statusCode} - ${executionTime}ms`,
        );
      }),
    );
  }
}
