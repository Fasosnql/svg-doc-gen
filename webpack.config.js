const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: `./src/index.js`,
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'svg-doc-gen',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  target: 'node',
  externals: [nodeExternals()]
};
