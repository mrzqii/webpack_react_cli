const webpack = require('webpack');
const path = require('path')
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../config/webpack.common.dev.js');
// 作用：1.为静态文件提供服务 2.自动刷新和热替换(HMR)
const devServer = {
	contentBase: path.join(__dirname, '../dist'),
	hot: true
}
const compiler = webpack(webpackConfig());
const options = Object.assign({}, devServer, {
	open: true
});
const server = new webpackDevServer(compiler, options);

server.listen(3007, '127.0.0.1', () => {
	console.log('Starting server on http://localhost:3007');
});
