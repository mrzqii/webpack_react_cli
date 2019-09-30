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
	],
	output: {
		// 分割出来的antd和react的代码并没有变化，名字也发生了变化，浏览器会再次请求这个模块，应该没有发生改变的模块保持名称以使浏览器从缓存中获取，在生产模式下使用`[chunkhash]`替代`[hash]`
		filename: 'js/[name][chunkhash].js' // 打包出来的vendors~main.js 是react和antd的js代码
	}
};

const options = {
	mode: 'production'
};

module.exports = merge(webpackConfigCreator(options), config);
