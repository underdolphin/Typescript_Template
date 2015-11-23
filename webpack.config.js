/*Copyright © 2015- underdolphin(masato sueda)
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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
