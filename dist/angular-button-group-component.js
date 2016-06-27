"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _angularButtonGroupController = require("./angular-button-group-controller");

var _angularButtonGroupController2 = _interopRequireDefault(_angularButtonGroupController);

var _angularButtonGroupTemplate = require("./angular-button-group-template.html!text");

var _angularButtonGroupTemplate2 = _interopRequireDefault(_angularButtonGroupTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    bindings: {
        is_visible: "=?isVisible",
        config: "=?",
        api: "=?"
    },
    controller: _angularButtonGroupController2.default,
    controllerAs: "AngularButtonGroup",
    template: _angularButtonGroupTemplate2.default
};
//# sourceMappingURL=sourcemaps/angular-button-group-component.js.map
