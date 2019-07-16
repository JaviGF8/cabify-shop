const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const eslint = require('eslint');

const isProduction = 'production' === process.env.ENVIRONMENT;

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
  hash: true,
});

const extractProjectStyle = new MiniCssExtractPlugin({
  filename: '[name].[contenthash].css',
});

const getPlugins = () => {
  const plugins = [];

  plugins.push(
    HtmlWebpackPluginConfig,
    new MiniCssExtractPlugin('styles.css'),
    new webpack.ProvidePlugin({ jQuery: 'jquery' }),
    new webpack.DefinePlugin({
      'process.env.ENVIRONMENT': JSON.stringify(process.env.ENVIRONMENT),
    }),
  );

  if (isProduction) {
    plugins.push(new webpack.SourceMapDevToolPlugin({ module: false }));
    plugins.push(new webpack.optimize.AggressiveMergingPlugin());
    plugins.push(new CleanWebpackPlugin([ 'build' ]));
    plugins.push(extractProjectStyle);
  } else {
    plugins.push(new webpack.SourceMapDevToolPlugin({}));
  }
  return plugins;
};

module.exports = {
  entry: [ 'babel-polyfill', './src/index.js' ],
  output: {
    path: path.resolve('build'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  optimization: {
    nodeEnv: process.env.ENVIRONMENT,
    splitChunks: { chunks: 'all' },
    minimizer: isProduction ?
      [
          new TerserPlugin({
            terserOptions: {
              compress: true,
              paralel: true,
              ecma: 6,
              output: {
                comments: false,
              },
            },
            sourceMap: false,
            parallel: true,
          }),
          new OptimizeCSSAssetsPlugin(),
        ] :
      [],
  },
  mode: process.env.ENVIRONMENT,
  resolve: {
    modules: [ path.join(__dirname, './src'), 'node_modules' ],
    extensions: [ '.js', '.jsx', '.css', '.scss' ],
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.(gif|svg|jpg|png|woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          failOnWarning: false,
          failOnError: true,
          formatter: eslint.CLIEngine.getFormatter('stylish'),
        },
        exclude: /node_modules/,
      },
      {
        test: /\.jsx$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          failOnWarning: false,
          failOnError: true,
          formatter: eslint.CLIEngine.getFormatter('stylish'),
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss|sass)$/,
        include: [ path.resolve(__dirname, 'src/') ],
        exclude: [ path.resolve(__dirname, 'node_modules/') ],
        use: [
          {
            loader: 'development' === process.env.ENVIRONMENT ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        include: [ path.resolve(__dirname, 'node_modules/') ],
        exclude: [ path.resolve(__dirname, 'src/') ],
        use: [
          {
            loader: 'development' === process.env.ENVIRONMENT ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    port: 3001,
    historyApiFallback: true,
  },
  plugins: getPlugins(),
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
};
