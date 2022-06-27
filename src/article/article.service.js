"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ArticleService = void 0;
var user_entity_1 = require("./../user/user.entity");
var common_1 = require("@nestjs/common");
var article_entity_1 = require("./article.entity");
var typeorm_1 = require("@nestjs/typeorm");
var typeorm_2 = require("typeorm");
var slugify_1 = require("slugify");
var ArticleService = /** @class */ (function () {
    function ArticleService(articleRepository, userRepository) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
    }
    ArticleService.prototype.findAll = function (currentUserId, query) {
        return __awaiter(this, void 0, void 0, function () {
            var queryBuilder, author, articlesCount, articles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryBuilder = (0, typeorm_2.getRepository)(article_entity_1.ArticleEntity)
                            .createQueryBuilder('articles')
                            .leftJoinAndSelect('articles.author', 'author');
                        if (query.tag) {
                            queryBuilder.andWhere('articles.tagList LIKE :tag', {
                                tag: "%".concat(query.tag)
                            });
                        }
                        if (!query.author) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userRepository.findOne({ username: query.author })];
                    case 1:
                        author = _a.sent();
                        queryBuilder.andWhere('articles.authorId = :id', {
                            id: author.id
                        });
                        _a.label = 2;
                    case 2:
                        queryBuilder.orderBy('articles.createdAt', 'DESC');
                        return [4 /*yield*/, queryBuilder.getCount()];
                    case 3:
                        articlesCount = _a.sent();
                        if (query.limit) {
                            queryBuilder.limit(query.limit);
                        }
                        if (query.offset) {
                            queryBuilder.offset(query.offset);
                        }
                        return [4 /*yield*/, queryBuilder.getMany()];
                    case 4:
                        articles = _a.sent();
                        return [2 /*return*/, { articles: articles, articlesCount: articlesCount }];
                }
            });
        });
    };
    ArticleService.prototype.createArticle = function (currentUser, createArticleDto) {
        return __awaiter(this, void 0, void 0, function () {
            var article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        article = new article_entity_1.ArticleEntity();
                        Object.assign(article, createArticleDto);
                        if (!article.tagList) {
                            article.tagList = [];
                        }
                        article.slug = this.getSlug(createArticleDto.title);
                        article.author = currentUser;
                        return [4 /*yield*/, this.articleRepository.save(article)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArticleService.prototype.deleteArticle = function (slug, 
    // currentUserId: number): Promise<ArticleEntity>{
    currentUserId) {
        return __awaiter(this, void 0, void 0, function () {
            var article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findBySlug(slug)];
                    case 1:
                        article = _a.sent();
                        if (!article) {
                            throw new common_1.HttpException('Article does not exist', common_1.HttpStatus.NOT_FOUND);
                        }
                        if (article.author.id !== currentUserId) {
                            throw new common_1.HttpException('You are not the author', common_1.HttpStatus.FORBIDDEN);
                        }
                        return [4 /*yield*/, this.articleRepository["delete"]({ slug: slug })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArticleService.prototype.updateArticle = function (slug, updateArticleDto, currentUserId) {
        return __awaiter(this, void 0, void 0, function () {
            var article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findBySlug(slug)];
                    case 1:
                        article = _a.sent();
                        if (!article) {
                            throw new common_1.HttpException('Article does not exist', common_1.HttpStatus.NOT_FOUND);
                        }
                        if (article.author.id !== currentUserId) {
                            throw new common_1.HttpException('You are not the author', common_1.HttpStatus.FORBIDDEN);
                        }
                        Object.assign(article, updateArticleDto);
                        return [4 /*yield*/, this.articleRepository.save(article)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArticleService.prototype.findBySlug = function (slug) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.articleRepository.findOne({ slug: slug })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArticleService.prototype.buildArticleResponse = function (article) {
        return { article: article };
    };
    ArticleService.prototype.getSlug = function (title) {
        return ((0, slugify_1["default"])(title, { lower: true })
            + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36));
    };
    ArticleService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(article_entity_1.ArticleEntity)),
        __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity))
    ], ArticleService);
    return ArticleService;
}());
exports.ArticleService = ArticleService;
