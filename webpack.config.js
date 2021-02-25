const path = require("path");
const fs = require("fs"); //fs = file system

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin"); //plugin webpack untuk ngebaca file HTML
const ImageMinPlugin = require("imagemin-webpack-plugin").default; // untuk meminify image
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // untuk mengekstrak css yang ada kedalam separate files
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //untuk menghapus setiap build yang sehabis direload-reload

const environment = require("./configs/env"); //konfigurasi ke folder config lalu env.js

const templateFiles = fs.readdirSync( //ngeread file system (fs)
  path.resolve(__dirname, environment.paths.source, "templates") //tujuannya ke folder templates
);
const htmlPluginEntries = templateFiles.map( //konfigurasi inputan HTML
  (template) =>
    new HTMLWebpackPlugin({
      inject: true,
      hash: false,
      filename: template,
      template: path.resolve(environment.paths.source, "templates", template), //sumber/lokasi file template html-nya
      favicon: path.resolve(environment.paths.source, "images", "favicon.ico"), //sumber/lokasi favicon-nya
    })
);

module.exports = {
  entry: { //entry point
    app: path.resolve(environment.paths.source, "js", "app.js"), //awal dari entry poin berawal dari Js/app.js
  },
  output: {
    path: environment.paths.output,
    filename: "js/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i, //regular expression, setiap ketemu file css 
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"], //harus berurutan
      },
      {
        test: /\.js$/, //setiap ketemu file estension js
        exclude: /node_modules/,
        include: environment.paths.source,
        use: ["babel-loader"], //library babel-loader
      },
      {
        test: /\.(png|gif|jpg|jpeg)$/, //extension gambar
        use: [
          {
            loader: "url-loader",
            options: {
              name: "images/design/[name].[hash:6].[ext]", //sesuaikan lokasinya
              publicPath: "../", //mundur membuka folder sebelumnya
              limit: environment.limits.images, //ukuran images (berhubungan dgn yang ada di env.js)
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/, //extension font
        use: [
          {
            loader: "url-loader",
            options: {
              name: "fonts/[name].[hash:6].[ext]",
              publicPath: "../",
              limit: environment.limits.fonts, //ukuran font (berhubungan dgn yang ada di env.js)
            },
          },
        ],
      },
    ],
  },

  plugins: [ //inisiasi plugin
    new MiniCssExtractPlugin({  //minify css
      filename: "css/app.minify.css", //konfigurasi filename css
    }),
    new ImageMinPlugin({ test: /\.(jpg|jpeg|png|gif|svg)$/i }), //untuk minify image
    new CleanWebpackPlugin({ //ngebersihin hasil sebelumnya
      verbose: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(environment.paths.source, "images", "content"), //images -> content
          to: path.resolve(environment.paths.output, "images", "content"), //dari images/content didistribusikan ke enj.js (cek output di env.js)
          toType: "dir",
          globOptions: {
            ignore: ["*.DS_Store", "Thumbs.db"], //bakal di ignore jika ketemu file ["*.DS_Store", "Thumbs.db"]
          },
        },
        {
          from: path.resolve(environment.paths.source, "images", "design"),
          to: path.resolve(environment.paths.output, "images", "design"),
          toType: "dir",
          globOptions: {
            ignore: ["*.DS_Store", "Thumbs.db"],
          },
        },
        {
          from: path.resolve(environment.paths.source, "css"),
          to: path.resolve(environment.paths.output, "css"),
          toType: "dir",
          globOptions: {
            ignore: ["*.DS_Store", "Thumbs.db"],
          },
        },
      ],
    }),
  ].concat(htmlPluginEntries),
  target: "web",
};
