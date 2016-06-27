import _ from "lodash";

/**
 * Class AngularButtonGroupUtils
 */
export default class AngularButtonGroupUtils {

    /**
     * createButtonsConfig
     *
     * @param config
     * @param default_config
     * @returns {*}
     */
    static createButtonsConfig(config, default_config) {

        return _.reduce(config, (result, item, key) => {

            result[ key ] = Object.assign({}, default_config, item, {
                label: !_.isArray(item.label) ? [ item.label ] : item.label,
                button_class: !_.isArray(item.button_class) ? [ item.button_class ] : item.button_class
            });

            return result;
        }, {});

    }

    /**
     * updateButtonsConfigProperty
     *
     * @param config
     * @param property
     * @param value
     * @param exclude
     * @returns {*}
     */
    static updateButtonsConfigProperty(config, property, value, exclude = []) {

        return _.reduce(config, (result, item, key) => {

            if (_.includes(exclude, key)) {
                result[ key ] = Object.assign({}, item);
                return result;
            }

            result[ key ] = _.reduce(item, (sub_result, sub_item, sub_key) => {

                sub_result[ sub_key ] = sub_key === property ? value : sub_item;
                return sub_result;

            }, {});

            return result;
        }, {});
    }
}
