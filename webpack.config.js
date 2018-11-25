var path = require('path');

module.exports = {
  entry: ['./src/game.ts', './styles/scss/style.scss'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.html$/, loader: 'raw-loader', exclude: '/node_modules/'},
      { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
      {
          test: /\.scss$/,
          use: [{
              loader: "style-loader"
          }, {
              loader: "css-loader"
          }, {
              loader: "sass-loader",
              options: {
                  file: "style/scss/styl.scss",
                  outFile: "style/css/style.css"
              }
          }]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, './'),
    publicPath: '/build/',
    host: '127.0.0.1',
    port: 8080,
    open: true,
    watchContentBase: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
  }
};
