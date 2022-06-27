"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ArticleEntity = void 0;
var user_entity_1 = require("./../user/user.entity");
var typeorm_1 = require("typeorm");
var ArticleEntity = /** @class */ (function () {
    function ArticleEntity() {
    }
    ArticleEntity.prototype.updateTimestamps = function () {
        this.updatedAt = new Date();
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], ArticleEntity.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ "default": '' })
    ], ArticleEntity.prototype, "slug");
    __decorate([
        (0, typeorm_1.Column)({ unique: true })
    ], ArticleEntity.prototype, "title");
    __decorate([
        (0, typeorm_1.Column)({ "default": '' })
    ], ArticleEntity.prototype, "description");
    __decorate([
        (0, typeorm_1.Column)({ "default": '' })
    ], ArticleEntity.prototype, "body");
    __decorate([
        (0, typeorm_1.Column)({ type: 'timestamp', "default": function () { return 'CURRENT_TIMESTAMP'; } })
    ], ArticleEntity.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.Column)({ type: 'timestamp', "default": function () { return 'CURRENT_TIMESTAMP'; } })
    ], ArticleEntity.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.Column)('simple-array')
    ], ArticleEntity.prototype, "tagList");
    __decorate([
        (0, typeorm_1.Column)({ "default": 0 })
    ], ArticleEntity.prototype, "favoritesCount");
    __decorate([
        (0, typeorm_1.BeforeUpdate)()
    ], ArticleEntity.prototype, "updateTimestamps");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.UserEntity; }, function (user) { return user.articles; }, { eager: true })
    ], ArticleEntity.prototype, "author");
    ArticleEntity = __decorate([
        (0, typeorm_1.Entity)({ name: 'articles' })
    ], ArticleEntity);
    return ArticleEntity;
}());
exports.ArticleEntity = ArticleEntity;
