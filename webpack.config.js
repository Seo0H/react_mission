const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return {
    mode: process.env.NODE_ENV,
    devtool: isDevelopment ? 'eval' : 'source-map',
    target: 'web',
    entry: './src/index.tsx',

    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js',
      clean: true,
    },
    devServer: {
      host: 'localhost',
      port: 3300,
      hot: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.json'),
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
      }),
    ],
  };
};
