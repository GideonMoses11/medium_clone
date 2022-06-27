import { ExpressRequest } from './../../types/expressRequest.interface';
import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<ExpressRequest>();
        // return request.isAuthenticated();
        if (request.user){
            return true;
        }

        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
}