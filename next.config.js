const withCSS = require("@zeit/next-css");
const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");

module.exports = withCSS({
  webpack(config, options) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config;
  }
});