const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
function webpackCommonConfigCreator(options) {
	const isEnvDevelopment = options.mode === 'development';
	const isEnvProduction = options.mode === 'production';
	return {
		mode: options.mode, // 开发模式
		entry: './src/index.js',
		output: {
			// filename: 'js/[name][hash].js',
			// filename: 'js/bundle.js',
			path: path.resolve(__dirname, '../build')
		},
		optimization: {
			splitChunks: {
				chunks: 'all',
				minSize: 50000,
				minChunks: 1
			}
		},
		module: {
			rules: [
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: 'iconfont/[hash].[ext]'
							}
						}
					]
				},
				{
					test: /\.(jpg|png|svg|gif)$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 10240,
								name: 'images/[hash].[ext]'
							}
						}
					]
				},
				{
					test: /\.(js|jsx)$/,
					include: path.resolve(__dirname, '../src'),
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: [ '@babel/preset-react' ],
								plugins: [
									'react-hot-loader/babel'
									// [ // antd按需加载的配置 有点问题 必须要css-loader的options里面importLoaders: 1 才能成功, 开发模式不行 待解决
									// 	'import',
									// 	{
									// 		libraryName: 'antd',
									// 		// libraryDirectory: 'es',
									// 		style: 'css' // `style: true` 会加载 less 文件
									// 	}
									// ]
								]
							}
						}
					]
				},
				{
					test: /\.css$/,
					exclude: path.resolve(__dirname, '../src'), // 表示不是从src里面引入的css需要使用下面的方式
					use: [
						{
							loader: 'style-loader',
							options: { injectType: 'linkTag' } // 新版本（1.0.0 ）使用方式有点变化
						},
						{
							loader: 'file-loader',
							options: {
								name: 'css/[name].css'
							}
						}
						// { loader: 'style-loader' },
						// {
						// 	loader: 'css-loader',
						// 	options: {
						// 		importLoaders: 1
						// 	}
						// }
					]
				},

				{
					test: /\.css/,
					include: path.resolve(__dirname, '../src'),
					use: [
						// 注意： use数组里面的元素不能是false
						isEnvDevelopment
							? 'style-loader'
							: {
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
					test: /\.less/,
					include: path.resolve(__dirname, '../src'),
					use: [
						// 注意： use数组里面的元素不能是false
						isEnvDevelopment
							? 'style-loader'
							: {
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
						},
						'less-loader'
					]
				},
				{
					test: /\.(scss|sass)/,
					include: path.resolve(__dirname, '../src'),
					exclude: /\.module\.(sass|scss)$/, // 排除这些文件
					use: [
						isEnvDevelopment
							? 'style-loader'
							: {
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
						isEnvDevelopment
							? 'style-loader'
							: {
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
