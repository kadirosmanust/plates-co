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
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // Injects styles into the DOM
          {
            loader: 'css-loader',
            options: {
              modules: true, // Enable CSS modules
              importLoaders: 1, // Number of loaders applied before CSS loader
            },
          },
          'sass-loader', // Compiles Sass to CSS
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
