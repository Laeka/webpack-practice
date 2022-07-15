//ARCHIVO PRINCIPAL DONDE SE TRABAJAN LAS CONFIGURACIONES
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const copyPlugin = require("copy-webpack-plugin");
// const cssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const terserPlugin = require("terser-webpack-plugin");
const dotEnv = require("dotenv-webpack");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // Entry nos permite decir el punto de entrada de nuestra aplicación
  entry: "./src/index.js",
  // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
  output: {
    // path es donde estará la carpeta donde se guardará los archivos
    // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
    path: path.resolve(__dirname, "dist"),
    // filename le pone el nombre al archivo final
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  mode: "development",
  // watch: true,
  resolve: {
    // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
    extensions: [".js"],
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
    },
  },
  module: {
    rules: [
      {
        // Test declara que extensión de archivos aplicara el loader
        test: /\.m?js$/,
        // Exclude permite omitir archivos o carpetas especificas
        exclude: /node_modules/,
        // Use es un arreglo u objeto donde dices que loader aplicaras
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        //propiedad que identifica cuáles archivos deberán ser transformados
        test: /\.css|.styl$/i,
        //propiedad que identifica el loader que será usado para transformar a dichos archivos
        use: [miniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
      {
        test: /\.png/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/font-woff",
              name: "[name].[contenthash].[ext]",
              outputPath: "./assets/fonts/",
              publicPath: "../assets/fonts/",
              esModule: false,
            },
          },
        ],
        type: "javascript/auto",
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      // INYECTA EL BUNDLE AL TEMPLATE HTML
      inject: true,
      // LA RUTA AL TEMPLATE HTML
      template: "./public/index.html",
      // NOMBRE FINAL DEL ARCHIVO
      filename: "./index.html",
    }),
    new miniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css",
    }),
    new copyPlugin({
      patterns: [
        {
          /*From ⇒ que recurso (archivo o directorio) deseamos copiar al directorio final
          To ⇒ en que ruta dentro de la carpeta final terminara los recursos */
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
    new dotEnv(),
    // new CleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, "dist/assets/**")],
    //   verbose: true,
    // }),
  ],
  // optimization: {
  //   minimize: true,
  //   minimizer: [new cssMinimizerPlugin(), new terserPlugin()],
  // },
};
