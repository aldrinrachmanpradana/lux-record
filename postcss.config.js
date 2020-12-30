module.exports = {
  plugins: [
    require("tailwindcss")("./tailwind.config.js"), //package tailwindcss lalu yg disampingnya lokasi dmna ngambilnya
    require("autoprefixer"), //package autoprefixer untuk menggenerate syntax yang gak dikenali di suatu browser
  ],
};
