"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AngularButtonGroupUtils = function () {
    function AngularButtonGroupUtils() {
        _classCallCheck(this, AngularButtonGroupUtils);
    }

    _createClass(AngularButtonGroupUtils, null, [{
        key: "createButtonsConfig",
        value: function createButtonsConfig(config, default_config) {

            return _lodash2.default.reduce(config, function (result, item, key) {

                result[key] = Object.assign({}, default_config, item, {
                    label: !_lodash2.default.isArray(item.label) ? [item.label] : item.label,
                    button_class: !_lodash2.default.isArray(item.button_class) ? [item.button_class] : item.button_class
                });

                return result;
            }, {});
        }
    }, {
        key: "updateButtonsConfigProperty",
        value: function updateButtonsConfigProperty(config, property, value) {
            var exclude = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];


            return _lodash2.default.reduce(config, function (result, item, key) {

                if (_lodash2.default.includes(exclude, key)) {
                    result[key] = Object.assign({}, item);
                    return result;
                }

                result[key] = _lodash2.default.reduce(item, function (sub_result, sub_item, sub_key) {

                    sub_result[sub_key] = sub_key === property ? value : sub_item;
                    return sub_result;
                }, {});

                return result;
            }, {});
        }
    }]);

    return AngularButtonGroupUtils;
}();

exports.default = AngularButtonGroupUtils;
//# sourceMappingURL=sourcemaps/angular-button-group-utils.js.map
