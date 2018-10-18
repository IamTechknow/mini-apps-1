var path = require('path');
var webpack = require('webpack')

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'client/index.jsx')
  },
  devtool: 'source-map',
  mode: 'development',
  cache: true,
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
};
