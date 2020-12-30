/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require("webpack-merge");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //CssMinimizerPlugin untuk meminify Js
const TerserPlugin = require("terser-webpack-plugin"); //untuk meminify JS

const webpackConfiguration = require("../webpack.config");

module.exports = merge(webpackConfiguration, {
  mode: "production", //mode productions

  /* Manage source maps generation process. Refer to https://webpack.js.org/configuration/devtool/#production */
  devtool: false, //devtool ga dikasih akses untuk ngebaca

  /* Optimization configuration */
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
  },

  /* Performance treshold configuration values */
  performance: {
    maxEntrypointSize: 512000, //pengaturan agar tidak melebihi 5mega
    maxAssetSize: 512000,
  },

  /* Additional plugins configuration */
  plugins: [], //khusus untuk melakukan setingan jika ingin pluginnya jalan di folder lokal
});
