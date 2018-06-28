const webpack = require("webpack")
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const BUILD_DIR = path.resolve(__dirname, "build")
const APP_DIR = path.resolve(__dirname, "src")

module.exports = {
  entry:  {
    main:   APP_DIR + "/index.js",
    vendor: [
      "vue",
    ],
  },
  output: {
    path:       BUILD_DIR,
    filename:   "js/[name].[chunkhash:6].js",
    publicPath: "/",
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        },
      }
    },
    runtimeChunk: true
  },
  module: {
    rules: [
      {
        test:   /\.vue$/,
        loader: "vue-loader",
      },
      {
        test:    /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use:  [
          MiniCssExtractPlugin.loader, "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles.[hash:6].css",
    }),
    new HtmlWebpackPlugin({
      chunks:         ["vendor", "main"],
      chunksSortMode: "manual",
      template:       "templates/index.html",
      filename:       "index.html",
      inject:         "head",
      hash:           true,
    }),
  ],
}

