const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const path = require('path');

const base = require('./webpack.base.config');

const prodConfig = merge(base, {
  mode: 'production',
  // option to use sourcemap, currently only for tbe builds
  devtool: false,
  // Utilize long-term caching by adding content hashes
  output: {
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].chunk.js',
    sourceMapFilename: 'sourcemaps/[file].map',
    clean: true,
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
              poolTimeout: 10_000, // ms
              poolParallelJobs: 200,
            },
          },
          {
            // https://webpack.js.org/loaders/babel-loader/
            loader: 'babel-loader',
            // fast refresh plugin
            options: {
              // default directory is node_modules/.cache/babel-loader
              cacheCompression: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // https://webpack.js.org/plugins/html-webpack-plugin/
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'public/index.html'),
      filename: './index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
    // https://webpack.js.org/plugins/compression-webpack-plugin/
    new CompressionPlugin({ test: /\.(js|jsx|less|css|html|svg)$/ }),
  ],
  optimization: {
    minimize: true,
    moduleIds: 'deterministic',
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];

            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  // https://webpack.js.org/configuration/cache/
  cache: {
    type: 'filesystem',
    buildDependencies: {
      // This makes all dependencies of this file - build dependencies
      config: [__filename],
    },
    // print stats of cache usage
    profile: true,
    // NOTE: if we change webpack options, change this, or remove old cache
    version: '1.1.0',
    // default directory is node_modules/.cache/webpack
  },
});

module.exports = prodConfig;
