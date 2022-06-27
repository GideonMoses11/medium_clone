import { UserService } from './../user.service';
import { JWT_SECRET } from './../../config';
import { ExpressRequest } from './../../types/expressRequest.interface';
import { NextFunction, Response } from 'express';
import { Injectable, NestMiddleware } from "@nestjs/common";
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor(private readonly userService: UserService){}
    async use(req: ExpressRequest, _: Response, next: NextFunction){
        // console.log('authMiddle', req.headers);
        if(!req.headers.authorization){
            req.user = null;
            next();
        }

        const token = req.headers.authorization.split(' ')[1];
        // console.log('token', token);

        try {
            const decode = verify(token, JWT_SECRET);
            const user = await this.userService.findById(decode.id);
            req.user = user;
            console.log('decode', decode);
            next();
        } catch (err) {
            req.user = null;
            next();
        }
        // console.log('token', token);
    }
}