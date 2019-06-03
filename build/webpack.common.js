const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const tsImportPluginFactory = require('ts-import-plugin')
const webpack = require('webpack');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    main: './src/index.tsx',
  },

  output: {
    filename: devMode ? '[name].js' : '[name].[contenthash].js',
    chunkFilename: devMode ? '[name].chunk.js' : '[name].[contenthash].chunk.js',
    path: path.resolve(__dirname, '../dist')
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader, //抽取css文件插件
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          // {
          //   loader: 'imports-loader?this=>window'
          // }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 10240
          }
        }
      },
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [ tsImportPluginFactory( /** options */) ]
            }),
            compilerOptions: {
              module: 'es2015'
            }
          },
        },
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({ //自动生成打包后的index.html文件
      template: 'src/index.html' //模板文件
    }),

    //每次打包后, 清空原先的打包文件夹
    new CleanWebpackPlugin(['dist'], //清空的文件夹名称
      {
        root: path.resolve(__dirname, '../') //清空的文件夹路径
      }
    ),

    //打包时抽取css文件
    new MiniCssExtractPlugin({
      filename: '[name].css', //生成的入口文件中引用的css文件名
      chunkFilename: '[name].chunk.css' //生成的间接引用的css文件名
    }),

    //全局加载第三方库
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'lodash',
      _join: ['lodash', 'join']
    }),
  ],

  //优化
  optimization: {
    // runtimeChunk: {
    //   name: 'runtime'
    // },
    usedExports: true, //tree shaking, 需要在package.json中设置忽略项

    //代码分割
    splitChunks: {
      chunks: 'all', //all: 异步和同步引入的模块都进行代码分割, async: 只分割异步加载的模块 initial: 只分割同步加载的模块

      //模块组
      cacheGroups: {
        vendors: {// vendors组的参数, 符合该要求的模块都会打包到同一个文件中, 只对同步引入的模块有效
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors', //打包生成的文件名
        }
      }
    }
  },
  // performance: false, //打包时是否有性能提示
};


