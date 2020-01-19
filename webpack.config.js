const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const marked = require("marked");
const renderer = new marked.Renderer();


const { MODE, HOST, PORT } = process.env;
module.exports = {
  mode: MODE,
  entry: {
    app: "./src/entry.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: './',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    sourceMapFilename: '[file].map'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  stats: {
    entrypoints: false,
    children: false
  },
  devtool: MODE === 'development' ? 'inline-source-map' : 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    publicPath: "/",
    port: PORT,
    hot: true,
    proxy: {
      '/wxserver': {
        target: HOST,
        secure: false
      }
    },
  },

  optimization: {
    usedExports: MODE === 'development' ? true : false,
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'async',
      automaticNameDelimiter: MODE === 'development' ? '~' : '.',
      cacheGroups: {
        vendor: MODE === 'development' ? {
          test: /[\\/]node_modules[\\/]/,
          maxSize: 50000,
          name: 'vendors',
          chunks: 'all',
          priority: 10
        } : {
            maxSize: 50000,
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10
          }
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: /src\/ui/
      },
      {
        test: /\.ts(x)$/,
        use: "ts-loader",
        exclude: /node_modules/
      },

      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === MODE,
              sourceMap: true
            }
          },
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === MODE,
              sourceMap: true
            }
          },
          'css-loader',
          {
            loader: 'less-loader', options: {
              sourceMap: true,
              javascriptEnabled: true
            }
          },
        ],
      },
      {
        test: /\.(png|gif|jpg|svg|jpeg|apk|zip|mp3)$/,
        exclude: /node_modules/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "highlight-loader"
          },
          {
            loader: "markdown-loader",
            options: {
              options: {
                pedantic: true,
                renderer
              }
            }
          }

        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'asyncChunks'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css",
      chunkFilename: "[id].css",
      ignoreOrder: false,
    }),
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.(js|css)$/i,
    }),
  ]
}
