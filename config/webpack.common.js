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
								plugins: [ 'react-hot-loader/babel' ]
							}
						}
					]
				},
				{
					test: /\.css/,
					include: path.resolve(__dirname, '../src'),
					use: [ 'style-loader', 'css-loader' ]
				},
				{
					test: /\.(scss|sass)/,
					include: path.resolve(__dirname, '../src'),
					exclude: /\.module\.(sass|scss)$/,
					use: [ 'style-loader', 'css-loader', 'sass-loader' ]
				},
				{
					test: /\.module\.(sass|scss)$/,
					include: path.resolve(__dirname, '../src'),
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								modules: {
									mode: 'local',
									localIdentName: '[path][name]_[local]--[hash:base64:5]'
								},
								localsConvention: 'camelCase'
							}
						},
						'sass-loader'
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
