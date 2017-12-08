// webpack.config.js

module.exports = [
  {
    name: 'server',
    entry: './src/server.js',
    target: 'node',
    output: {
      path: __dirname + '/build',
      filename: 'server-bundle.js',
    },
    node: {
      fs: 'empty'
    },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-2', 'react']
            }
          }
        }
      ]
    }
  },
  {
    name: 'client',
    entry: './src/client.js',
    output: {
      path: __dirname + '/build',
      filename: 'bundle.js',
    },
    node: {
       fs: 'empty'
    },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-2', 'react']
            }
          }
        }
      ]
    }
  },
  {
    name: 'test',
    entry: './src/test.js',
    target: 'node',
    output: {
      path: __dirname + '/build',
      filename: 'test-bundle.js',
    },
    node: {
      fs: 'empty'
    },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-2', 'react']
            }
          }
        }
      ]
    }
  },
];
