const path = require("path");

module.exports = {
  paths: {
    /* Path to source files directory */
    source: path.resolve(__dirname, "../src/"),

    /* Path to built files directory */
    output: path.resolve(__dirname, "../dist/"), //output didistribusikan ke folder dist
  },
  server: {
    host: "localhost",
    port: 9999,
  },
  limits: {
    /* Image files size in bytes. Below this value the image file will be served as DataURL (inline base64). */
    images: 8192, //berhubungan dgn yang ada di webpack.config.js

    /* Font files size in bytes. Below this value the font file will be served as DataURL (inline base64). */
    fonts: 8192, //berhubungan dgn yang ada di webpack.config.js
  },
};
