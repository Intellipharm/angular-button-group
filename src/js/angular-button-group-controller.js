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
