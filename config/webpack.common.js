const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
function webpackCommonConfigCreator(options) {
	return {
		mode: options.mode, // 开发模式
		entry: './src/index.js',
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, '../build')
		},
		plugins: [
			new HtmlWebpackPlugin(),
			new CleanWebpackPlugin({
				cleanOnceBeforeBuildPatterns: [
					path.resolve(process.cwd(), 'build/'),
					path.resolve(process.cwd(), 'dist/')
				]
			})
		]
	};
}
module.exports = webpackCommonConfigCreator;
