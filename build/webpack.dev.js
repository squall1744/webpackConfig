const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
	mode: 'development',

	devtool: 'cheap-module-eval-source-map', //sourceMap

	devServer: { //开发模式开启的代理服务器
		contentBase: './dist', //输出路径
		open: true, //服务器启动后自动打开链接
		port: 8080, //服务器端口
		hot: true //是否开启热加载
	},

	plugins: [
		// 热加载插件
		new webpack.HotModuleReplacementPlugin()
	],
};

module.exports =  merge(commonConfig, devConfig);
