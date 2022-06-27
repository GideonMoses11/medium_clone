import { ArticlesResponseInterface } from './types/articlesResponse.interface';
import { ArticleResponseInterface } from './types/articleResponse.interface';
import { UserEntity } from './../user/user.entity';
import { CreateArticleDto } from './createArticle.dto';
import { AuthGuard } from './../user/guards/auth.guard';
import { ArticleService } from './article.service';
import { Body, Controller, Delete, Get, Param, Post, UseGuards, Put, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { User } from '@app/user/decorators/user.decorator';

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get()
    async findAll(@User('id') currentUserId: number, @Query() query: any): 
    Promise<ArticlesResponseInterface>{
        return await this.articleService.findAll(currentUserId, query);
    }

    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async create(@User() currentUser: UserEntity, @Body('article') 
        createArticleDto: CreateArticleDto): Promise<ArticleResponseInterface> {
        const article = await this.articleService.createArticle(
            currentUser, createArticleDto);
        return this.articleService.buildArticleResponse(article);
    }

    @Get(':slug')
    async getSingleArticle(@Param('slug') slug: string): Promise<ArticleResponseInterface>{
        const article = await this.articleService.findBySlug(slug);
        return this.articleService.buildArticleResponse(article);
    }

    @Delete(':slug')
    @UseGuards(AuthGuard)
    async deleteArticle(@User('id') currentUserId: number, @Param('slug') slug: string){
        return await this.articleService.deleteArticle(slug, currentUserId);
    }

    @Put(':slug')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async updateArticle(@User('id') currentUserId: number, 
        @Param('slug') slug: string, @Body('article') updateArticleDto: CreateArticleDto){
        const article = await this.articleService.updateArticle(slug, updateArticleDto, currentUserId);
        return await this.articleService.buildArticleResponse(article);
    }
}
