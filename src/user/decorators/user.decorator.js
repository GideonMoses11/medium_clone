"use strict";
exports.__esModule = true;
exports.User = void 0;
var common_1 = require("@nestjs/common");
exports.User = (0, common_1.createParamDecorator)(function (data, ctx) {
    var request = ctx.switchToHttp().getRequest();
    if (!request.user) {
        return null;
    }
    if (data) {
        return request.user[data];
    }
    return request.user;
});
