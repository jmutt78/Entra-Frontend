const withCSS = require("@zeit/next-css");
const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");

module.exports = withCSS({
  webpack(config, options) {
    if (localEnv == null) {
      //console.log("Process.env", process.env);
      // TODO: Add key values from process.env here
      config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    } else {
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config;
  }
});
