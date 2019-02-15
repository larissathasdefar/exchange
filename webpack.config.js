const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const fs = require('fs')
const webpack = require('webpack')

module.exports = env => {
  return ({
    entry: './src/App.jsx',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: { loader: 'babel-loader' },
        },
        { test: /\.html$/, use: [{ loader: 'html-loader' }] },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] },
      ],
    },
    output: {
      filename: 'static/js/[name].[chunkhash].js',
      path: path.resolve(__dirname, 'build'),
    },
    plugins: [
      new CleanWebpackPlugin(['build']), // Delete files from /build before create the new one
      new HtmlWebPackPlugin({
        template: './public/index.html',
        filename: './index.html',
        favicon: 'src/assets/favicon.ico',
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        assets: path.resolve(__dirname, 'src/assets'),
        components: path.resolve(__dirname, 'src/components'),
        ui: path.resolve(__dirname, 'src/components/UI'),
        reducers: path.resolve(__dirname, 'src/reducers'),
        containers: path.resolve(__dirname, 'src/containers'),
        actions: path.resolve(__dirname, 'src/actions'),
        constants: path.resolve(__dirname, 'src/constants/action-types.js'),
      },
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    devtool: 'source-map',
    devServer: {
      contentBase: path.join(__dirname, 'build'),
      compress: true,
      port: 3000,
      open: true,
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      }
    }
  })
}
