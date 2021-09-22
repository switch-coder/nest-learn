import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
  } from '@nestjs/common';
  import { Response } from 'express';
  
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(execption: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = execption.getStatus();
        const err = execption.getResponse() as string | { error: string; statusCode: 400; message: string[]}
        console.log(status, err);
        
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url
        })
    }
  }