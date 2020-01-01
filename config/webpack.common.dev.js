const path = require("path");
const HappyPack = require("happypack"); // 多线程编译
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const webpackbar = require("webpackbar"); // 进度条
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const CopyWebpackPlugin = require("copy-webpack-plugin");
function webpackCommonConfigCreator() {
  const PUBLIC_PATH = "/"; //表示资源的发布地址
  return {
    mode: "development", // 开发模式
    entry: ["./src/index.js"],
    output: {
      filename: "js/[name][hash].js",
      path: path.resolve(__dirname, "../build"),
      publicPath: PUBLIC_PATH // 在生成的html中
    },
    optimization: {
      splitChunks: {
        chunks: "all"
      }
    },
    devtool: "cheap-module-eval-source-map",
    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "iconfont/[hash].[ext]"
              }
            }
          ]
        },
        {
          test: /\.(mp3|mp4|pdf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "media/[hash].[ext]"
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 10240,
                name: "images/[hash].[ext]"
              }
            }
          ]
        },
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, "../src"),
          use: ["happypack/loader?id=happy_babel"]
        },
        {
          test: /\.css$/,
          exclude: path.resolve(__dirname, "../src"), // 表示不是从src里面引入的css需要使用下面的方式
          use: [
            {
              loader: "style-loader",
              options: { injectType: "linkTag" } // 新版本（1.0.0 ）使用方式有点变化
            },
            {
              loader: "file-loader",
              options: {
                name: "css/[name][hash].css"
              }
            }
          ]
        },
        {
          test: /\.module\.css$/,
          include: path.resolve(__dirname, "../src"),
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                // importLoaders: 1,
                modules: {
                  mode: "local",
                  localIdentName: "[path][name]_[local]--[hash:base64:5]"
                },
                localsConvention: "camelCase"
              }
            },
            {
              // 必须在package.json里面添加 browserslist 字段才会生效
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: loader => [
                  require("postcss-import")({ root: loader.resourcePath }),
                  require("autoprefixer")()
                ]
              }
            }
          ]
        },
        {
          test: /\.css/,
          exclude: /\.module\.css$/,
          include: path.resolve(__dirname, "../src"),
          // exclude: /node_modules/,
          use: [
            "style-loader",
            "css-loader",
            {
              //  必须在package.json里面添加 browserslist 字段才会生效
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: loader => [
                  require("postcss-import")({ root: loader.resourcePath }),
                  require("autoprefixer")()
                ]
              }
            }
          ]
        },

        {
          test: /\.less/,
          include: path.resolve(__dirname, "../src"),
          use: [
            // 注意： use数组里面的元素不能是false
            "style-loader",
            "css-loader",
            {
              //  必须在package.json里面添加 browserslist 字段才会生效
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: loader => [
                  require("postcss-import")({ root: loader.resourcePath }),
                  require("autoprefixer")()
                ]
              }
            },
            "less-loader"
          ]
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../public/index.html") //配置插件使用我们定义的模板
      }),
      // 忽略moment.js中所有的locale文件
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 使用方式
      // const moment = require('moment');
      // 引入zh-cn locale文件
      // require('moment/locale/zh-cn');
      // moment.locale('zh-cn');
      new webpackbar(),
      /**
       * 每次打包前清除数据
       */
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          path.resolve(process.cwd(), "build/"),
          path.resolve(process.cwd(), "dist/")
        ]
      }),
      /**
       * 提取CSS等样式生成单独的CSS文件
       * **/
      new MiniCssExtractPlugin({
        filename: "css/[name][hash].css"
      }),
      // 这个插件帮助我们定义一个常量，然后在项目的代码里面可以通过'process.env.ASSET_PATH'来读取到
      new webpack.DefinePlugin({
        "process.env.ASSET_PATH": JSON.stringify("../")
      }),
      // 多线程 在项目比较复杂的时候加速构建速度 如果有多个就创建多个HappyPack实例 只是配置的id和loaders不一样
      new HappyPack({
        id: "happy_babel",
        loaders: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // 用于缓存加载器的结果 优化编译速度
              // presets: ['@babel/preset-react'],
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                [
                  // antd按需加载的配置 有点问题 必须要css-loader的options里面importLoaders: 1 才能成功, 开发模式不行 待解决
                  "import",
                  {
                    libraryName: "antd",
                    // libraryDirectory: 'es',
                    style: "css" // `style: true` 会加载 less 文件
                  }
                ]
              ]
            }
          }
        ]
      }),
      new CopyWebpackPlugin([
        {
          from: path.resolve(process.cwd(), "public"),
          to: "./",
          ignore: ["index.html"]
        }
      ])
      // new BundleAnalyzerPlugin(
      //   {
      //     analyzerMode: 'server',
      //     analyzerHost: '127.0.0.1',
      //     analyzerPort: 8889,
      //     reportFilename: 'report.html',
      //     defaultSizes: 'parsed',
      //     openAnalyzer: true,
      //     generateStatsFile: false,
      //     statsFilename: 'stats.json',
      //     statsOptions: null,
      //     logLevel: 'info'
      //   }
      // )
    ],
    resolve: {
      extensions: [".js", ".jsx", ".less", ".css"], //后缀名自动补全
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    }
  };
}
module.exports = webpackCommonConfigCreator;
