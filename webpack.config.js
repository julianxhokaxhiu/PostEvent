const path = require('path')

module.exports = {
  entry: './src/',
  resolve: {
    extensions: [ '.es6', '.js' ]
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'PostEvent.js',
    library: 'PostEvent',
    libraryTarget: "umd2"
  },
  module: {
    rules: [
      {
        test: /\.es6$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      }
    ]
  },
  devServer: {
    compress: true,
    disableHostCheck: true,
    host: "0.0.0.0",
    port: 8080
  }
};