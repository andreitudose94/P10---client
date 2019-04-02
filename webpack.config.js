const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /(\.jpg$|\.png$)/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: './img/[name]-[hash:6].[ext]'
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new FaviconsWebpackPlugin({
      logo: './src/style/favicons/logo.png',
      prefix: 'favicon/',
      persistentCache: false,
      // emitStats: true,
      // statsFilename: 'iconstats.json',
      inject: true,
      background: '#4F2170',
      title: 'React Start',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: true
      }
    }),
    // new OfflinePlugin({
    //   relativePaths: true,
    //   autoUpdate: true, // check for new version every hour
    //   ServiceWorker: {
    //     navigateFallbackURL: '/',
    //     events: true
    //   }
    // })
  ]
}
