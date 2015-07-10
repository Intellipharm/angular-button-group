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
