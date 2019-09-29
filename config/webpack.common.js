const path = require('path');
console.log('path', path.resolve(__dirname, '../build'));
module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, '../build'),
		filename: 'bundle.js'
	}
};
