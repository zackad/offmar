const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const Metadata = require('./src/utils/metadata')

module.exports = {
  output: {
    filename: 'offmar.user.js'
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            beautify: false,
            preamble: Metadata.generate()
          }
        }
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.BannerPlugin({
      banner: Metadata.generate(),
      raw: true,
      entryOnly: true
    })
  ]
}
