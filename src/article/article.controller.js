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
exports.ArticleController = void 0;
var auth_guard_1 = require("./../user/guards/auth.guard");
var common_1 = require("@nestjs/common");
var user_decorator_1 = require("@app/user/decorators/user.decorator");
var ArticleController = /** @class */ (function () {
    function ArticleController(articleService) {
        this.articleService = articleService;
    }
    ArticleController.prototype.findAll = function (currentUserId, query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.articleService.findAll(currentUserId, query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArticleController.prototype.create = function (currentUser, createArticleDto) {
        return __awaiter(this, void 0, void 0, function () {
            var article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.articleService.createArticle(currentUser, createArticleDto)];
                    case 1:
                        article = _a.sent();
                        return [2 /*return*/, this.articleService.buildArticleResponse(article)];
                }
            });
        });
    };
    ArticleController.prototype.getSingleArticle = function (slug) {
        return __awaiter(this, void 0, void 0, function () {
            var article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.articleService.findBySlug(slug)];
                    case 1:
                        article = _a.sent();
                        return [2 /*return*/, this.articleService.buildArticleResponse(article)];
                }
            });
        });
    };
    ArticleController.prototype.deleteArticle = function (currentUserId, slug) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.articleService.deleteArticle(slug, currentUserId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArticleController.prototype.updateArticle = function (currentUserId, slug, updateArticleDto) {
        return __awaiter(this, void 0, void 0, function () {
            var article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.articleService.updateArticle(slug, updateArticleDto, currentUserId)];
                    case 1:
                        article = _a.sent();
                        return [4 /*yield*/, this.articleService.buildArticleResponse(article)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        (0, common_1.Get)(),
        __param(0, (0, user_decorator_1.User)('id')),
        __param(1, (0, common_1.Query)())
    ], ArticleController.prototype, "findAll");
    __decorate([
        (0, common_1.Post)(),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        (0, common_1.UsePipes)(new common_1.ValidationPipe()),
        __param(0, (0, user_decorator_1.User)()),
        __param(1, (0, common_1.Body)('article'))
    ], ArticleController.prototype, "create");
    __decorate([
        (0, common_1.Get)(':slug'),
        __param(0, (0, common_1.Param)('slug'))
    ], ArticleController.prototype, "getSingleArticle");
    __decorate([
        (0, common_1.Delete)(':slug'),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        __param(0, (0, user_decorator_1.User)('id')),
        __param(1, (0, common_1.Param)('slug'))
    ], ArticleController.prototype, "deleteArticle");
    __decorate([
        (0, common_1.Put)(':slug'),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        (0, common_1.UsePipes)(new common_1.ValidationPipe()),
        __param(0, (0, user_decorator_1.User)('id')),
        __param(1, (0, common_1.Param)('slug')),
        __param(2, (0, common_1.Body)('article'))
    ], ArticleController.prototype, "updateArticle");
    ArticleController = __decorate([
        (0, common_1.Controller)('articles')
    ], ArticleController);
    return ArticleController;
}());
exports.ArticleController = ArticleController;
