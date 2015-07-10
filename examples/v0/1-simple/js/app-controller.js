(function () {

    "use strict";

	//-------------------------
	// App Controller
	//-------------------------

	var controller = function ($s, $q, $timeout) {
        var self = this;
        this.show_buttons = 0;
        this.angular_button_group = {};
        this.pendingSave;
        this.cancelPendingSaveTimer = {};

        this.forceReset = function() {
            //this.angular_button_group.reset();

            this.pendingSave = $q.defer();

            this.pendingSave.promise.then(function(response) {
                console.log(response);
            }, function(response) {
                console.log(response);
            }, function(response) {
                console.log(response);
            });

            this.cancelPendingSaveTimer = $timeout(function() {
                self.pendingSave.resolve('resolve!');
            }, 100);
        };
        this.toggleVisibility = function() {
            self.show_buttons ^= 1;
        };
        this.toggleVisibilityDelete = function() {
            self.angular_button_group_config.delete.visible ^= 1;
        };
        this.editHandler = function(button) {
            console.log("EDIT handler called");
        };
        this.toggleHandler = function(button) {
            console.log("toggle handler called (label_index: "+button.label_index+")");
        };
        this.cycleHandler = function(button) {
            console.log("cycle handler called (label_index: "+button.label_index+", button_class_index: "+button.button_class_index+")");
        };
        this.cancelHandler = function(button, confirming, result) {
            if (confirming) {
                console.log("CANCEL handler called ::: confirming...");
            } else {
                if (result === true) {
                    console.log("CANCEL handler called ::: confirmed");
                } else if (result === false) {
                    console.log("CANCEL handler called ::: not confirmed");
                }
            }
        };
        this.deleteHandler = function(button) {
            console.log("DELETE handler called");
        };

        this.angular_button_group_config = {
            edit: {
                label: "edit",
                button_class: "btn btn-info",
                callback: self.editHandler
            },
            toggle: {
                label: ["ON", "OFF"],
                button_class: ["btn btn-success", "btn btn-danger"],
                callback: self.toggleHandler
            },
            cycle: {
                label: ["One", "Two", "Three"],
                button_class: ["btn btn-default", "btn btn-primary", "btn btn-info", "btn btn-success", "btn btn-warning", "btn btn-danger"],
                callback: self.cycleHandler
            },
            cancel: {
                label: "cancel",
                button_class: "btn btn-warning",
                confirm: true,
                confirm_group_class: "btn-group btn-group-justified",
                confirm_yes_label: "confirm cancel",
                confirm_yes_button_class: "btn btn-warning",
                confirm_no_label: "back",
                confirm_no_button_class: "btn btn-info",
                disable_others: true,
                callback: self.cancelHandler
            },
            delete: {
                label: "delete",
                button_class: "btn btn-danger",
                confirm: true,
                confirm_message: "Are you sure?",
                confirm_label_class: "confirm-message",
                confirm_group_class: "btn-group btn-group-justified",
                confirm_yes_label: "YES",
                confirm_yes_button_class: "btn btn-warning",
                confirm_no_label: "NO",
                confirm_no_button_class: "btn btn-info",
                visible: false,
                callback: self.deleteHandler
            }
        };
	};

	controller.$inject = ['$scope', '$q', '$timeout'];

	angular.module('App').controller('AppController', controller);

})();
