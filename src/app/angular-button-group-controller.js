import AngularButtonGroupUtils from "./angular-button-group-utils";

/**
 * Class AngularButtonGroupController
 */
export default class AngularButtonGroupController {

    constructor($s) {

        this.$s = $s;

        this.show_confirm_group = false;
        this.api = $s.api || {};

        this.api.reset = this.reset.bind(this);

        this.buttons = {};

        // defaults

        this.default_config = {
            busy_confirming: false, // control
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
            disabled: false, // control
            label: [],
            label_index: 0,
            show_confirm_group: false, // control
            visible: true
        };

        //--------------------------------------------------------
        // watchers
        //--------------------------------------------------------

        $s.$watch('AngularButtonGroup.config', (val) => {

            if (_.isUndefined(val)) {
                return;
            }

            // reset
            if (!_.has(val, 'reset') && val.reset) {
                val.reset = false;
            }

            // create buttons config
            this.buttons_config = AngularButtonGroupUtils.createButtonsConfig(val, this.default_config);

        }, true);
    }

    ////////////////////////////////////////////////
    //
    // handlers
    //
    ////////////////////////////////////////////////

    /**
     * onClick
     *
     * @param {string} button_key
     */
    onClick(button_key) {

        let _is_confirmed = null;
        let _config = Object.assign({}, this.buttons_config[ button_key ]);

        // enable
        _config.disabled = false;

        // if multiple labels then cycle
        if (_config.label.length > 1) {
            if (++_config.label_index === _config.label.length) {
                _config.label_index = 0;
            }
        }

        // if multiple classes then cycle
        if (_config.button_class.length > 1) {
            if (++_config.button_class_index === _config.button_class.length) {
                _config.button_class_index = 0;
            }
        }

        // stop others that are confirming
        let _exclude = [ button_key ];
        this.buttons_config = AngularButtonGroupUtils.updateButtonsConfigProperty(this.buttons_config, "show_confirm_group", false, _exclude);

        // disable others?
        if (_config.disable_others) {
            _exclude = [ button_key ];
            this.buttons_config = AngularButtonGroupUtils.updateButtonsConfigProperty(this.buttons_config, "disabled", true, _exclude);
        }

        // requires confirmation?
        if (_config.confirm) {
            _config.busy_confirming = true;
            _config.show_confirm_group = true;
        }

        // update this button's config
        this.buttons_config[ button_key ] = _config;

        // external handler
        if (!_.isNull(_config.callback)) {
            _config.callback(_config, _config.busy_confirming, _is_confirmed);
        }
    }

    /**
     * onYesClick
     *
     * @param {string} button_key
     */
    onYesClick(button_key) {

        let _is_confirmed = true;
        let _config = Object.assign({}, this.buttons_config[ button_key ]);

        _config.show_confirm_group = false;
        _config.busy_confirming = false;

        // disable others?
        if (_config.disable_others) {
            let _exclude = [ button_key ];
            this.buttons_config = AngularButtonGroupUtils.updateButtonsConfigProperty(this.buttons_config, "disabled", false, _exclude);
        }

        // update this button's config
        this.buttons_config[ button_key ] = _config;

        // external handler
        if (!_.isNull(_config.callback)) {
            _config.callback(_config, _config.busy_confirming, _is_confirmed);
        }
    }

    /**
     * onNoClick
     *
     * @param {string} button_key
     */
    onNoClick(button_key) {

        let _is_confirmed = false;
        let _config = Object.assign({}, this.buttons_config[ button_key ]);

        // disable others?
        if (_config.disable_others) {
            let _exclude = [ button_key ];
            this.buttons_config = AngularButtonGroupUtils.updateButtonsConfigProperty(this.buttons_config, "disabled", false, _exclude);
        }

        _config.show_confirm_group = false;
        _config.busy_confirming = false;

        // update this button's config
        this.buttons_config[ button_key ] = _config;

        // external handler
        if (!_.isNull(_config.callback)) {
            _config.callback(_config, _config.busy_confirming, _is_confirmed);
        }
    }

    ////////////////////////////////////////////////
    //
    // utils
    //
    ////////////////////////////////////////////////

    /**
     * reset
     */
    reset() {
        // recreate initial buttons config
        this.buttons_config = AngularButtonGroupUtils.createButtonsConfig(this.config, this.default_config);
    }
}

AngularButtonGroupController.$inject = ['$scope'];
