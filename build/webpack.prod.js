const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const commonConfig = require('./webpack.common');

const prodConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map',

	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})] //压缩css文件
	},
};

module.exports = merge(commonConfig, prodConfig);
