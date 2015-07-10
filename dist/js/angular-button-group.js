(function() {

    "use strict";

    //----------------------------------
    // Angular Button Group
    //----------------------------------

    angular.module('AngularButtonGroup', []);

})();

(function () {

    "use strict";

    //-------------------------
    // Angular Button Group controller
    //-------------------------

    var controller = function ($s) {

        var self = this;
        this.api = $s.api || {};
        this.show_confirm_group = false;

        //--------------------------------------------------------
        // handlers
        //--------------------------------------------------------

        /**
         * onClick
         *
         * @param {object} button
         */
        this.onClick = function(button) {

            // enable
            button.disabled = false;

            // if multiple labels then cycle
            if (button.label.length > 1) {
                if (++button.label_index === button.label.length) {
                    button.label_index = 0;
                }
            }

            // if multiple classes then cycle
            if (button.button_class.length > 1) {
                if (++button.button_class_index === button.button_class.length) {
                    button.button_class_index = 0;
                }
            }

            // stop others that are confirming
            _.forEach($s.config, function(item, key) {
                if (item !== button) {
                    item.show_confirm_group = false;
                }
            });

            // disable others?
            if (button.disable_others) {
                _.forEach($s.config, function(item, key) {
                    if (item !== button) {
                        item.disabled = true;
                    }
                });
            }

            // requires confirmation?
            if (button.confirm) {
                button.busy_confirming = true;
                button.show_confirm_group = true;
            }

            // external handler
            if (!_.isNull(button.callback)) {
                button.callback(button, button.busy_confirming);
            }
        };

        /**
         * onYesClick
         *
         * @param {object} button
         */
        this.onYesClick = function(button) {

            button.show_confirm_group = false;
            button.busy_confirming = false;

            // disable others?
            if (button.disable_others) {
                _.forEach($s.config, function(item, key) {
                    if (item !== button) {
                        item.disabled = false;
                    }
                });
            }

            // external handler
            if (!_.isNull(button.callback)) {
                button.callback(button, false, true);
            }
        };

        /**
         * onNoClick
         *
         * @param {object} button
         */
        this.onNoClick = function(button) {

            // disable others?
            if (button.disable_others) {
                _.forEach($s.config, function(item, key) {
                    if (item !== button) {
                        item.disabled = false;
                    }
                });
            }

            button.show_confirm_group = false;
            button.busy_confirming = false;

            // external handler
            if (!_.isNull(button.callback)) {
                button.callback(button, false, false);
            }
        };

        //--------------------------------------------------------
        // api
        //--------------------------------------------------------

        this.api.reset = function() {
            _.forEach($s.config, function(item, key) {
                item.show_confirm_group = false;
                item.busy_confirming = false;
                item.disabled = false;
            });
        };
    };

    controller.$inject = ['$scope'];

    angular.module('AngularButtonGroup').controller('AngularButtonGroupCtrl', controller);

})();

(function() {

    "use strict";

    //----------------------------------
    // angular-button-group directive
    //----------------------------------

    var directive = function() {

        return {
            restrict: 'EA',
            scope: {
                is_visible: "=isVisible",
                config:     "=",
                api:        "="
            },
            controller: "AngularButtonGroupCtrl as ctrl",
            link: function(scope, element, attrs, controller) {

                // defaults
                var default_config = {
                    button_class: [],
                    button_class_index: 0,
                    busy_confirming: false,
                    label: [],
                    label_index: 0,
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
                    visible: true
                };

                //--------------------------------------------------------
                // watchers
                //--------------------------------------------------------

                scope.$watch('config', function(val) {
                    if (!_.isUndefined(val)) {

                        // reset
                        if (!_.has(val, 'reset') && val.reset) {
                            console.log("reset");
                            val.reset = false;
                            controller.reset();
                            return true;
                        }

                        // init
                        _.forEach(val, function(item, key, obj) {

                            // transform label
                            if (!_.isArray(item.label)) {
                                item.label = [item.label];
                            }

                            // transform button_class
                            if (!_.isArray(item.button_class)) {
                                item.button_class = [item.button_class];
                            }

                            // merge
                            obj[key] = _.merge(_.clone(default_config, true), item);
                        });
                    }
                }, true);

                scope.$watch('reset', function(val) {
                    if (!_.isUndefined(val)) {
                        if (val) {
                            scope.reset = false;
                            controller.reset();
                        }
                    }
                }, true);
            },
            replace: true,
            templateUrl: 'html/angular-button-group.html'
        };
    };

    directive.$inject = [];

    angular.module('AngularButtonGroup')
        .directive('angularButtonGroup', directive);

})();

(function () {

    "use strict";

    //-------------------------
    // Angular Button Group settings
    //-------------------------

    angular.module('AngularButtonGroup')
        .constant('ANGULAR_BUTTON_GROUP_CLASS',               "aaa");

})();
