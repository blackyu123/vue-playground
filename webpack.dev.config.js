const webpack = require("webpack")
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const BUILD_DIR = path.resolve(__dirname, "build")
const APP_DIR = path.resolve(__dirname, "src")

module.exports = {
  entry:  {
    vendor: [
      "vue",
    ],
    main:   APP_DIR + "/index.js",
  },
  output: {
    path:       BUILD_DIR,
    filename:   "js/[name].[hash:6].js",
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
      template:       "templates/index.html",
      filename:       "index.html",
      hash:           true,
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV:          JSON.stringify(process.env.NODE_ENV),
        API_HOST:          JSON.stringify(process.env.API_HOST || "http://localhost:9090"),
        WEB_HOST:          JSON.stringify(process.env.WEB_HOST || "https://www.xx.com"),
      },
    }),
  ],
}

