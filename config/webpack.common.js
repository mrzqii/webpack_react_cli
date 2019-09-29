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
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					include: path.resolve(__dirname, '../src'),
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: [ '@babel/preset-react' ],
								plugins: [ 'react-hot-loader/babel' ] // 只是js和jsx修改会热更新
							}
						}
					]
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, '../public/index.html') //配置插件使用我们定义的模板
			}),
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
