const webpack = require("webpack");
const { override, useBabelRc } = require("customize-cra");

const NODE_ENV = process.env.NODE_ENV || "development";
const isDevelopment = NODE_ENV === "development";
const isProduction = NODE_ENV === "production";

module.exports = override(
  useBabelRc(),
  config => {
    config.resolve.extensions = ["*", ".js", ".jsx"];

    return config;
  },
  config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.isDevelopment": JSON.stringify(isDevelopment),
        "process.env.isProduction": JSON.stringify(isProduction)
      })
    );
    return config;
  }
);
