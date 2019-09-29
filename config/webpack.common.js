const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								// 这里可以指定一个 publicPath
								// 默认使用 webpackOptions.output中的publicPath
								// publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
								// 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
								publicPath: './'
								// publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
							}
						},
						'css-loader',
						{
							//  必须在package.json里面添加 browserslist 字段才会生效
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: (loader) => [
									require('postcss-import')({ root: loader.resourcePath }),
									require('autoprefixer')()
								]
							}
						}
					]
				},
				{
					test: /\.(scss|sass)/,
					include: path.resolve(__dirname, '../src'),
					exclude: /\.module\.(sass|scss)$/, // 排除这些文件
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								// 这里可以指定一个 publicPath
								// 默认使用 webpackOptions.output中的publicPath
								// publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
								// 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
								publicPath: './'
								// publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
							}
						},
						'css-loader',
						// {
						// 	// 这个方式也是可以的 下面配置的方式也是可以的 但是必须在package.json里面添加 browserslist 字段才会生效
						// 	loader: 'postcss-loader',
						// 	options: {
						// 		ident: 'postcss',
						// 		plugins: (loader) => [
						// 			require('postcss-import')({ root: loader.resourcePath }),
						// 			require('autoprefixer')()
						// 		]
						// 	}
						// },
						{
							loader: 'postcss-loader',
							options: {
								plugins: [ require('autoprefixer') /*在这里添加*/ ]
							}
						},
						'sass-loader'
					]
				},
				{
					test: /\.module\.(sass|scss)$/, // 这里只配置了sass支持module 如果需要css文件页支持 也可以配置
					include: path.resolve(__dirname, '../src'),
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								// 这里可以指定一个 publicPath
								// 默认使用 webpackOptions.output中的publicPath
								// publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
								// 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
								publicPath: './'
								// publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
							}
						},
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
						{
							// 必须在package.json里面添加 browserslist 字段才会生效
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: (loader) => [
									require('postcss-import')({ root: loader.resourcePath }),
									require('autoprefixer')()
								]
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
			}),
			new MiniCssExtractPlugin({
				filename: 'css/[name][hash].css'
			})
		]
	};
}
module.exports = webpackCommonConfigCreator;
