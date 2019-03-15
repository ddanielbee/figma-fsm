"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var findNodeNameById = function (nodes, id) {
    var foundNode = nodes.find(function (node) { return node.id === id; });
    if (foundNode) {
        return foundNode.name;
    }
    return "";
};
var hasChildWithTransition = function (node) {
    return node.children && node.children.some(function (childNode) { return childNode.transitionNodeID !== undefined; });
};
var hasTransitionNodeId = function (node) { return node.transitionNodeID !== undefined; };
var buildEventsObject = function (currentNode, index, canvasChildren) {
    if (currentNode.transitionNodeID) {
        var eventsObject = {};
        eventsObject["EVENT" + (index + 1)] = findNodeNameById(canvasChildren, currentNode.transitionNodeID);
        return eventsObject;
    }
    return {};
};
var buildStateObject = function (currentNode, canvasChildren) {
    if (currentNode.children) {
        var stateObject = {};
        stateObject[currentNode.name] = {
            on: currentNode.children
                .filter(hasTransitionNodeId)
                .reduce(function (acc, cur, index) { return (__assign({}, acc, buildEventsObject(cur, index, canvasChildren))); }, {})
        };
        return stateObject;
    }
    return {};
};
exports.transformCanvastoFiniteStateMachine = function (_a) {
    var name = _a.name, children = _a.children, prototypeStartNodeID = _a.prototypeStartNodeID;
    if (!prototypeStartNodeID || !children) {
        return null;
    }
    var initial = findNodeNameById(children, prototypeStartNodeID);
    var states = children
        .filter(hasChildWithTransition)
        .reduce(function (acc, currentNode) { return (__assign({}, acc, buildStateObject(currentNode, children))); }, {});
    return { id: name, initial: initial, states: states };
};
