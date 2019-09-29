const webpackConfigCreator = require('./webpack.common');
const merge = require('webpack-merge');

const config = {};

const options = {
	mode: 'production'
};

module.exports = merge(webpackConfigCreator(options), config);
