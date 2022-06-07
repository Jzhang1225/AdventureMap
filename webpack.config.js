const webpack = require("webpack");
const dotenv = require("dotenv");

module.exports = () => {
  const env = dotenv.config().parsed;

  const envKeys = Object.keys(env).reduce((acc, key) => {
    acc[`process.env.${key}`] = JSON.stringify(env[key]);
    return acc;
  }, {});

  return {
    entry: ["./client/index.js"],
    output: {
      path: __dirname,
      filename: "./public/bundle.js",
    },
    devtool: "source-map",
    plugins: [new webpack.DefinePlugin(envKeys)],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      ],
    },
  };
};
