var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: [
		'babel-polyfill',
		'./src/app'
	],
	devtool: 'source-map',
	devServer: {
		contentBase: "./src"
	},
	output: {
		path: __dirname + '/dist',
		filename: 'app.bundle.js'
	},
	// loaders: [
	// 	{
	// 		test: /\.js$/,
	// 		loader: 'babel-loader'
	// 	}
	// ],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['es2015']
				}
			}, {
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	},
	plugins: [
		new HtmlwebpackPlugin({
			template: 'src/index.html'
		})
	]
};
