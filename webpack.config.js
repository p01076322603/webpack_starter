const path = require('path');
const { pathToFileURL } = require('url');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/assets/js/app.js',
  output: {
    filename: './assets/js/app.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [ 'file-loader?name=assets/images/[name].[ext]', 'image-webpack-loader' ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './assets/css/app.bundle.css'
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: './src/assets/images', to: './assets/images' }]
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
};