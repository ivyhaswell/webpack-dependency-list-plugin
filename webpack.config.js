const path = require("path");

const isDev = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDev ? "development" : "production",
  entry: "./index.ts",
  devtool: isDev ? "inline-source-map" : false,
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "ts-loader",
          options: {
            // jsc: {
            //   parser: {
            //     syntax: "typescript",
            //   },
            // },
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts"],
  },
  externals: {
    "fs-extra": "commonjs fs-extra",
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "libs"),
    libraryTarget: "commonjs",
    // library: 'WebpackDependencyListPlugin',
    // chunkFormat: 'commonjs'
  },
};
