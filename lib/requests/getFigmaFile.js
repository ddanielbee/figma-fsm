"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
var constants_1 = require("./constants");
exports.getFigmaFile = function (token, fileKey) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res, e_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("" + constants_1.FIGMA_API_URL + fileKey, {
                        headers: { "X-Figma-Token": token }
                    })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
            case 2:
                e_1 = _a.sent();
                console.log(e_1.response.data.err);
                return [2 /*return*/, e_1.response.data.err];
            case 3: return [2 /*return*/];
        }
    });
}); };
