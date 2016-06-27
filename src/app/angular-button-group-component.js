import controller from "./angular-button-group-controller";
import template from "./angular-button-group-template.html!text";

export default {
    bindings: {
        is_visible: "=?isVisible",
        config:     "=?",
        api:        "=?"
    },
    controller: controller,
    controllerAs: "AngularButtonGroup",
    template: template
};