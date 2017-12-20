const merge = require('lodash.merge');
const defaultConfig = require('../../webpack');

module.exports = function extendWebpack(config) {
	merge(defaultConfig, config);
    // Convert module loaders test value into a regexp
    defaultConfig.module.rules = defaultConfig.module.rules.map(function (rule) {
        const decodedRegexp = new RegExp(rule.test);
        rule.test = decodedRegexp;
        return rule;
    });
};
