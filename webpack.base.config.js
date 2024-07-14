const ESLintPlugin = require('eslint-webpack-plugin');

const path = require('path');

module.exports = {
  entry: { main: path.resolve(__dirname, './src/index.js') },
  // Where files should be sent once they are bundled
  output: {
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  },
  // Rules of how webpack will take our files, compile & bundle them for the browser
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['js'],
      exclude: ['node_modules', 'build'],
    }),
  ],
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
    fallback: {
      fs: false,
    },
    alias: {
      '@src': path.resolve(__dirname, './src/'),
    },
  },
  target: ['browserslist'],
};
