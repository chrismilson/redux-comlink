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
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                { targets: { node: 10 } }
              ]
            ]
          }
        }
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
