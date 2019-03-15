"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transformCanvasToFiniteStateMachine_1 = require("./transformCanvasToFiniteStateMachine");
exports.transformFileToFiniteStateMachines = function (prototypesFile) {
    return prototypesFile.document.children
        .map(transformCanvasToFiniteStateMachine_1.transformCanvastoFiniteStateMachine)
        .filter(function (fsm) { return fsm !== null; });
};
