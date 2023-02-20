const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');

module.exports = {
   mode: "production",
   entry: {
      background: path.resolve(__dirname, "..", "src", "background.ts"),
      popup:  path.resolve(__dirname, "..", "src", "app.tsx"),
   },
   output: {
      path: resolve(__dirname, "../dist"),
      filename: "[name].js",
   },
   resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
   },
   module: {
      rules: [
         {
            test: /\.ts(x?)$/,
            loader: "ts-loader",
            exclude: /node_modules/,
         },
      ],
   },
   plugins: [
      new CopyPlugin({
         patterns: [{from: "public", to: "."}]
      }),
      new HTMLWebpackPlugin({
         template: 'src/index.html',  
         filename: 'index.html',
         chunks: ['popup'],
      }),
   ],
};
