const path = require('path');
function webpackCommonConfigCreator(options) {
	return {
		mode: options.mode, // 开发模式
		entry: './src/index.js',
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, '../build')
		}
	};
}
module.exports = webpackCommonConfigCreator;
