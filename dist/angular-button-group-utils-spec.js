"use strict";

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _deepFreeze = require("deep-freeze");

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _angularButtonGroupUtils = require("./angular-button-group-utils");

var _angularButtonGroupUtils2 = _interopRequireDefault(_angularButtonGroupUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("AngularButtonGroupUtils", function () {

    describe("createButtonsConfig", function () {

        it("should retain all config keys", function () {

            var _config = {
                xxx: {
                    aaa: "AAA",
                    label: "BBB",
                    button_class: "CCC"
                },
                zzz: {
                    aaa: "AAA",
                    label: "BBB",
                    button_class: "CCC"
                }
            };
            var _default_config = {};

            (0, _deepFreeze2.default)(_config);
            (0, _deepFreeze2.default)(_default_config);

            var _result = _angularButtonGroupUtils2.default.createButtonsConfig(_config, _default_config);

            expect(_lodash2.default.keys(_result)).toEqual(_lodash2.default.keys(_config));
        });

        it("should leave certain properties unchanged", function () {

            var _config = {
                xxx: {
                    aaa: "AAA",
                    label: "BBB",
                    button_class: "CCC"
                },
                zzz: {
                    aaa: "AAA",
                    label: "BBB",
                    button_class: "CCC"
                }
            };
            var _default_config = {};

            (0, _deepFreeze2.default)(_config);
            (0, _deepFreeze2.default)(_default_config);

            var _result = _angularButtonGroupUtils2.default.createButtonsConfig(_config, _default_config);

            expect(_result.xxx.aaa).toEqual(_config.xxx.aaa);
            expect(_result.zzz.aaa).toEqual(_config.zzz.aaa);
        });

        it("should leave label unchanged if array provided", function () {

            var _config = {
                xxx: {
                    aaa: "AAA",
                    label: ["BBB1", "BBB2"],
                    button_class: "CCC"
                },
                zzz: {
                    aaa: "AAA",
                    label: ["BBB3", "BBB4"],
                    button_class: "CCC"
                }
            };
            var _default_config = {};

            (0, _deepFreeze2.default)(_config);
            (0, _deepFreeze2.default)(_default_config);

            var _result = _angularButtonGroupUtils2.default.createButtonsConfig(_config, _default_config);

            expect(_result.xxx.label).toEqual(_config.xxx.label);
            expect(_result.zzz.label).toEqual(_config.zzz.label);
        });

        it("should leave button_class unchanged if array provided", function () {

            var _config = {
                xxx: {
                    aaa: "AAA",
                    label: "BBB",
                    button_class: ["CCC1", "CCC2"]
                },
                zzz: {
                    aaa: "AAA",
                    label: "BBB",
                    button_class: ["CCC3", "CCC4"]
                }
            };
            var _default_config = {};

            (0, _deepFreeze2.default)(_config);
            (0, _deepFreeze2.default)(_default_config);

            var _result = _angularButtonGroupUtils2.default.createButtonsConfig(_config, _default_config);

            expect(_result.xxx.button_class).toEqual(_config.xxx.button_class);
            expect(_result.zzz.button_class).toEqual(_config.zzz.button_class);
        });

        it("should convert label to array is array is not provided", function () {

            var _config = {
                xxx: {
                    aaa: "AAA",
                    label: "BBB",
                    button_class: "CCC"
                },
                zzz: {
                    aaa: "AAA",
                    label: "BBB",
                    button_class: "CCC"
                }
            };
            var _default_config = {};

            (0, _deepFreeze2.default)(_config);
            (0, _deepFreeze2.default)(_default_config);

            var _result = _angularButtonGroupUtils2.default.createButtonsConfig(_config, _default_config);

            expect(_lodash2.default.isArray(_result.xxx.label)).toBe(true);
        });

        it("should convert label to array is array is not provided", function () {

            var _config = {
                xxx: {
                    aaa: "AAA",
                    label: "BBB",
                    button_class: "CCC"
                },
                zzz: {
                    aaa: "AAA",
                    label: "BBB",
                    button_class: "CCC"
                }
            };
            var _default_config = {};

            (0, _deepFreeze2.default)(_config);
            (0, _deepFreeze2.default)(_default_config);

            var _result = _angularButtonGroupUtils2.default.createButtonsConfig(_config, _default_config);

            expect(_lodash2.default.isArray(_result.xxx.button_class)).toBe(true);
        });
    });

    describe("updateButtonsConfigProperty", function () {

        it("should correctly update provided property for a items ", function () {

            var _config = {
                xxx: {
                    aaa: "AAA1",
                    bbb: "BBB1"
                },
                zzz: {
                    aaa: "AAA2",
                    bbb: "BBB2"
                },
                vvv: {
                    aaa: "AAA3",
                    bbb: "BBB3"
                }
            };
            var _property = "bbb";
            var _value = 123;
            var _exclude = [];

            (0, _deepFreeze2.default)(_config);
            (0, _deepFreeze2.default)(_exclude);

            var _result = _angularButtonGroupUtils2.default.updateButtonsConfigProperty(_config, _property, _value, _exclude);

            expect(_result.xxx.aaa).toEqual("AAA1");
            expect(_result.xxx[_property]).toEqual(_value);

            expect(_result.zzz.aaa).toEqual(_config.zzz.aaa);
            expect(_result.zzz[_property]).toEqual(_value);

            expect(_result.vvv.aaa).toEqual(_config.vvv.aaa);
            expect(_result.vvv[_property]).toEqual(_value);
        });

        it("should exclude items in provided array", function () {

            var _config = {
                xxx: {
                    aaa: "AAA1",
                    bbb: "BBB1"
                },
                zzz: {
                    aaa: "AAA2",
                    bbb: "BBB2"
                },
                vvv: {
                    aaa: "AAA3",
                    bbb: "BBB3"
                }
            };
            var _property = "bbb";
            var _value = 123;
            var _exclude = ["zzz"];

            (0, _deepFreeze2.default)(_config);
            (0, _deepFreeze2.default)(_exclude);

            var _result = _angularButtonGroupUtils2.default.updateButtonsConfigProperty(_config, _property, _value, _exclude);

            expect(_result.xxx.aaa).toEqual("AAA1");
            expect(_result.xxx[_property]).toEqual(_value);

            expect(_result.zzz.aaa).toEqual(_config.zzz.aaa);
            expect(_result.zzz[_property]).toEqual(_config.zzz[_property]);

            expect(_result.vvv.aaa).toEqual(_config.vvv.aaa);
            expect(_result.vvv[_property]).toEqual(_value);
        });
    });
});
//# sourceMappingURL=sourcemaps/angular-button-group-utils-spec.js.map
