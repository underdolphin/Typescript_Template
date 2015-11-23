var path = require('path');
var webpack = require('webpack');

module.exports = {
  // Entry point
  entry: './src/Ts/app.ts',
  // output place
  dest: './src',
  // output filename
  output: {
    filename: 'app.js'
  },
  resolve: {
    root: [path.join(__dirname, 'bower_components'), path.join(__dirname, 'node_modules')],
    extensions: ['', '.webpack.js', 'web.js', '.js', '.ts'],
  },
  // plugins is used to load the library accuired from bower
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
    )
  ],
  module: {
    loaders: [{
      test: /\.ts$/,
      loader: 'ts-loader'
    }]
  }
}
