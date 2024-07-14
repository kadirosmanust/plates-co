const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = require('./webpack.base.config');

const devConfig = merge(base, {
  mode: 'development',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  // Emit a source map for easier debugging
  // See https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'eval-source-map',
  devServer: {
    port: 9003,
    open: true,
    hot: true,
    historyApiFallback: true,
    allowedHosts: 'all',
    client: { overlay: false },
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            // https://webpack.js.org/loaders/thread-loader/
            loader: 'thread-loader',
            options: {
              workers: 4,
              workerParallelJobs: 20,
              poolRespawn: false,
              // watch mode, don't timeout
              poolTimeout: Infinity,
              poolParallelJobs: 200,
            },
          },
          {
            loader: 'babel-loader',
            // fast refresh plugin
            options: {
              // default directory is node_modules/.cache/babel-loader
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
      inject: true,
    }),
  ],
  optimization: { splitChunks: { chunks: 'all' } },
  performance: { hints: false },
  cache: {
    name: 'dev-server',
    // default is in memory, but making it filesystem is good for "npm start"s
    type: 'filesystem',
    // default directory is node_modules/.cache/webpack
    // print stats of cache usage
    profile: true,
    buildDependencies: {
      // This makes all dependencies of this file - build dependencies
      config: [__filename],
    },
    // NOTE: if we change webpack options, change this, or remove old cache
    version: '1.1.0',
  },
});

module.exports = devConfig;
