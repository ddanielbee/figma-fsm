"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var getFigmaFile_1 = require("./requests/getFigmaFile");
var transformFileToFiniteStateMachines_1 = require("./transformations/transformFileToFiniteStateMachines");
exports.figmaPrototypesToFiniteStateMachines = function (token, fileKey) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var fileData;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getFigmaFile_1.getFigmaFile(token, fileKey)];
            case 1:
                fileData = _a.sent();
                return [2 /*return*/, transformFileToFiniteStateMachines_1.transformFileToFiniteStateMachines(fileData)];
        }
    });
}); };
