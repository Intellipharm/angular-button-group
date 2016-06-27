"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _angularButtonGroupUtils = require("./angular-button-group-utils");

var _angularButtonGroupUtils2 = _interopRequireDefault(_angularButtonGroupUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AngularButtonGroupController = function () {
    function AngularButtonGroupController($s) {
        var _this = this;

        _classCallCheck(this, AngularButtonGroupController);

        this.$s = $s;

        this.show_confirm_group = false;
        this.api = $s.api || {};

        this.api.reset = this.reset.bind(this);

        this.buttons = {};

        this.default_config = {
            busy_confirming: false,
            button_class: [],
            button_class_index: 0,
            callback: null,
            confirm: false,
            confirm_group_class: "",
            confirm_label_class: "",
            confirm_message: null,
            confirm_no_label: "NO",
            confirm_no_button_class: "",
            confirm_yes_label: "YES",
            confirm_yes_button_class: "",
            disable_others: false,
            disabled: false,
            label: [],
            label_index: 0,
            show_confirm_group: false,
            visible: true
        };

        $s.$watch('AngularButtonGroup.config', function (val) {

            if (_.isUndefined(val)) {
                return;
            }

            if (!_.has(val, 'reset') && val.reset) {
                val.reset = false;
            }

            _this.buttons_config = _angularButtonGroupUtils2.default.createButtonsConfig(val, _this.default_config);
        }, true);
    }

    _createClass(AngularButtonGroupController, [{
        key: "onClick",
        value: function onClick(button_key) {

            var _config = Object.assign({}, this.buttons_config[button_key]);

            _config.disabled = false;

            if (_config.label.length > 1) {
                if (++_config.label_index === _config.label.length) {
                    _config.label_index = 0;
                }
            }

            if (_config.button_class.length > 1) {
                if (++_config.button_class_index === _config.button_class.length) {
                    _config.button_class_index = 0;
                }
            }

            var _exclude = [button_key];
            this.buttons_config = _angularButtonGroupUtils2.default.updateButtonsConfigProperty(this.buttons_config, "show_confirm_group", false, _exclude);

            if (_config.disable_others) {
                _exclude = [button_key];
                this.buttons_config = _angularButtonGroupUtils2.default.updateButtonsConfigProperty(this.buttons_config, "disabled", true, _exclude);
            }

            if (_config.confirm) {
                _config.busy_confirming = true;
                _config.show_confirm_group = true;
            }

            this.buttons_config[button_key] = _config;

            if (!_.isNull(_config.callback)) {
                _config.callback(_config, _config.busy_confirming);
            }
        }
    }, {
        key: "onYesClick",
        value: function onYesClick(button_key) {

            var _config = Object.assign({}, this.buttons_config[button_key]);

            _config.show_confirm_group = false;
            _config.busy_confirming = false;

            if (_config.disable_others) {
                var _exclude = [button_key];
                this.buttons_config = _angularButtonGroupUtils2.default.updateButtonsConfigProperty(this.buttons_config, "disabled", false, _exclude);
            }

            this.buttons_config[button_key] = _config;

            if (!_.isNull(_config.callback)) {
                _config.callback(_config, false, true);
            }
        }
    }, {
        key: "onNoClick",
        value: function onNoClick(button_key) {

            var _config = Object.assign({}, this.buttons_config[button_key]);

            if (_config.disable_others) {
                var _exclude = [button_key];
                this.buttons_config = _angularButtonGroupUtils2.default.updateButtonsConfigProperty(this.buttons_config, "disabled", false, _exclude);
            }

            _config.show_confirm_group = false;
            _config.busy_confirming = false;

            this.buttons_config[button_key] = _config;

            if (!_.isNull(_config.callback)) {
                _config.callback(_config, false, true);
            }
        }
    }, {
        key: "reset",
        value: function reset() {
            this.buttons_config = _angularButtonGroupUtils2.default.createButtonsConfig(this.config, this.default_config);
        }
    }]);

    return AngularButtonGroupController;
}();

exports.default = AngularButtonGroupController;


AngularButtonGroupController.$inject = ['$scope'];
//# sourceMappingURL=sourcemaps/angular-button-group-controller.js.map
