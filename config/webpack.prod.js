const webpackConfigCreator = require('./webpack.common');
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //  对css进行压缩
const safePostCssParser = require('postcss-safe-parser'); // 查找并修复 CSS 语法错误。

const config = {
	plugins: [
		new OptimizeCSSAssetsPlugin({
			cssProcessorOptions: {
				parser: safePostCssParser,
				map: false
			}
		})
	]
};

const options = {
	mode: 'production'
};

module.exports = merge(webpackConfigCreator(options), config);
