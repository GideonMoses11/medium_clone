"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var article_module_1 = require("./article/article.module");
var auth_middleware_1 = require("./user/middlewares/auth.middleware");
var user_module_1 = require("./user/user.module");
var common_1 = require("@nestjs/common");
var app_controller_1 = require("@app/app.controller");
var app_service_1 = require("@app/app.service");
var tag_module_1 = require("@app/tag/tag.module");
var typeorm_1 = require("@nestjs/typeorm");
var ormconfig_1 = require("@app/ormconfig");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes({
            path: '*',
            method: common_1.RequestMethod.ALL
        });
    };
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                article_module_1.ArticleModule,
                user_module_1.UserModule, typeorm_1.TypeOrmModule.forRoot(ormconfig_1["default"]), tag_module_1.TagModule, user_module_1.UserModule, article_module_1.ArticleModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
