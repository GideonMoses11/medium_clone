import { TypeOrmModule } from '@nestjs/typeorm';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TagEntity } from './tag.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TagEntity])],
    controllers: [
        TagController,],
    providers: [
        TagService,],
})
export class TagModule { }
