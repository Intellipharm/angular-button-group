import _ from "lodash";
import deepFreeze from 'deep-freeze';

import AngularButtonGroupUtils from "./angular-button-group-utils";

describe("AngularButtonGroupUtils", () => {

    //------------------------------------------------------------
    // createButtonsConfig
    //------------------------------------------------------------

    describe("createButtonsConfig", () => {

        it("should retain all config keys", () => {

            let _config = {
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
            let _default_config = {};

            deepFreeze(_config);
            deepFreeze(_default_config);

            let _result = AngularButtonGroupUtils.createButtonsConfig(_config, _default_config);

            expect(_.keys(_result)).toEqual(_.keys(_config));
        });

        it("should leave certain properties unchanged", () => {

            let _config = {
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
            let _default_config = {};

            deepFreeze(_config);
            deepFreeze(_default_config);

            let _result = AngularButtonGroupUtils.createButtonsConfig(_config, _default_config);

            expect(_result.xxx.aaa).toEqual(_config.xxx.aaa);
            expect(_result.zzz.aaa).toEqual(_config.zzz.aaa);
        });

        it("should leave label unchanged if array provided", () => {

            let _config = {
                xxx: {
                    aaa: "AAA",
                    label: [ "BBB1", "BBB2" ],
                    button_class: "CCC"
                },
                zzz: {
                    aaa: "AAA",
                    label: [ "BBB3", "BBB4" ],
                    button_class: "CCC"
                }
            };
            let _default_config = {};

            deepFreeze(_config);
            deepFreeze(_default_config);

            let _result = AngularButtonGroupUtils.createButtonsConfig(_config, _default_config);

            expect(_result.xxx.label).toEqual(_config.xxx.label);
            expect(_result.zzz.label).toEqual(_config.zzz.label);
        });

        it("should leave button_class unchanged if array provided", () => {

            let _config = {
                xxx: {
                    aaa: "AAA",
                    label: "BBB",
                    button_class: [ "CCC1", "CCC2" ]
                },
                zzz: {
                    aaa: "AAA",
                    label: "BBB",
                    button_class: [ "CCC3", "CCC4" ]
                }
            };
            let _default_config = {};

            deepFreeze(_config);
            deepFreeze(_default_config);

            let _result = AngularButtonGroupUtils.createButtonsConfig(_config, _default_config);

            expect(_result.xxx.button_class).toEqual(_config.xxx.button_class);
            expect(_result.zzz.button_class).toEqual(_config.zzz.button_class);
        });

        it("should convert label to array is array is not provided", () => {

            let _config = {
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
            let _default_config = {};

            deepFreeze(_config);
            deepFreeze(_default_config);

            let _result = AngularButtonGroupUtils.createButtonsConfig(_config, _default_config);

            expect(_.isArray(_result.xxx.label)).toBe(true);
        });

        it("should convert label to array is array is not provided", () => {

            let _config = {
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
            let _default_config = {};

            deepFreeze(_config);
            deepFreeze(_default_config);

            let _result = AngularButtonGroupUtils.createButtonsConfig(_config, _default_config);

            expect(_.isArray(_result.xxx.button_class)).toBe(true);
        });

    });

    //------------------------------------------------------------
    // createButtonsConfig
    //------------------------------------------------------------

    describe("updateButtonsConfigProperty", () => {

        it("should correctly update provided property for a items ", () => {

            let _config = {
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
            let _property = "bbb";
            let _value = 123;
            let _exclude = [];

            deepFreeze(_config);
            deepFreeze(_exclude);

            let _result = AngularButtonGroupUtils.updateButtonsConfigProperty(_config, _property, _value, _exclude);

            expect(_result.xxx.aaa).toEqual("AAA1");
            expect(_result.xxx[ _property ]).toEqual(_value);

            expect(_result.zzz.aaa).toEqual(_config.zzz.aaa);
            expect(_result.zzz[ _property ]).toEqual(_value);

            expect(_result.vvv.aaa).toEqual(_config.vvv.aaa);
            expect(_result.vvv[ _property ]).toEqual(_value);
        });

        it("should exclude items in provided array", () => {

            let _config = {
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
            let _property = "bbb";
            let _value = 123;
            let _exclude = [ "zzz" ];

            deepFreeze(_config);
            deepFreeze(_exclude);

            let _result = AngularButtonGroupUtils.updateButtonsConfigProperty(_config, _property, _value, _exclude);

            expect(_result.xxx.aaa).toEqual("AAA1");
            expect(_result.xxx[ _property ]).toEqual(_value);

            expect(_result.zzz.aaa).toEqual(_config.zzz.aaa);
            expect(_result.zzz[ _property ]).toEqual(_config.zzz[ _property ]);

            expect(_result.vvv.aaa).toEqual(_config.vvv.aaa);
            expect(_result.vvv[ _property ]).toEqual(_value);
        });

    });
});