const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
  const options = {
    mode: env.mode,
    entry: path.resolve(__dirname, 'src/app.js'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build/' + env.mode)
    },

    devtool: 'source-map',

    module: {
      rules: [
        { test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env',  { 'targets': { 'browsers': ['last 2 versions'] } }]
              ]
            }
          }
        },
        { test: /\.css$/,
          use: [ MiniCssExtractPlugin.loader, "css-loader" ]
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        files: {
          css: ['scr/app.css']
        }
      }),
      new MiniCssExtractPlugin({
        filename: "style.css"
      })
    ]
  };
  return options;
};