const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: path.resolve('lib'),
    filename: 'main.js',
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node-modules/,
        use: 'babel-loader'
      }
    ]
  },
  externals: {
    comlink: {
      root: 'Comlink',
      commonjs2: 'comlink',
      commonjs: 'comlink',
      amd: 'comlink'
    }
  }
}
