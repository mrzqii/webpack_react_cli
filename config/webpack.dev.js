const webpackConfigCreator = require('./webpack.common');
const merge = require('webpack-merge');
const path = require('path');

const config = {
	devServer: {
		contentBase: path.join(__dirname, '../dist'),
		hot: true
	},
	output: {
		filename: 'js/[name][hash].js'
	},
	devtool: 'inline-source-map'
};

const options = {
	mode: 'development'
};

module.exports = merge(webpackConfigCreator(options), config);
