const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 该插件能够在项目根目录生成一份## manifest.json的文件，通过该文件的映射关系可以让我们知道webpack是如何追踪所有模块并映射到输出bundle中的
const ManifestPlugin = require("webpack-manifest-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //  对css进行压缩
const safePostCssParser = require("postcss-safe-parser"); // 查找并修复 CSS 语法错误。
const webpackbar = require("webpackbar"); // 进度条
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
function webpackCommonConfigCreator() {
  /**
   * 基础路径
   * 比如我上传到自己的服务器填写的是："/work/pwa/"，最终访问为"https://isluo.com/work/pwa/"
   * 根据你自己的需求填写
   * "/" 就是根路径，假如最终项目上线的地址为：https://isluo.com/， 那就可以直接写"/"
   * **/
  const PUBLIC_PATH = "/"; //表示资源的发布地址

  return {
    mode: "production", // 开发模式
    entry: "./src/index.js",
    output: {
      // 分割出来的antd和react的代码并没有变化，名字也发生了变化，浏览器会再次请求这个模块，应该没有发生改变的模块保持名称以使浏览器从缓存中获取，在生产模式下使用`[chunkhash]`替代`[hash]`
      filename: "js/[name][chunkhash].js", // 打包出来的vendors~main.js 是react和antd的js代码
      path: path.resolve(__dirname, "../build"),
      publicPath: PUBLIC_PATH // 在生成的html中
    },
    optimization: {
      minimizer: [
        // 代码压缩优化
        new TerserPlugin({
          cache: true, // 开启缓存
          parallel: true // 多线程
        })
      ],
      splitChunks: {
        chunks: "all"
      }
    },
    // devtool: "source-map",
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
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: true, // 用于缓存加载器的结果 优化编译速度
                // presets: ["@babel/preset-react"],
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
                name: "css/[name][contenthash].css"
              }
            }
          ]
        },
        {
          test: /\.css/,
          exclude: /\.module\.css$/,
          include: path.resolve(__dirname, "../src"),
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              //  必须在package.json里面添加 browserslist 字段才会生效
              loader: "postcss-loader",
              options: {
                importLoaders: 1, // 生产模式需要配置这个 不然antd按需加载不生效
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
          test: /\.module\.css$/, // 这里只配置了css支持module 如果需要其他文件页支持 也可以配置
          include: path.resolve(__dirname, "../src"),
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
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
          test: /\.less/,
          include: path.resolve(__dirname, "../src"),
          use: [
            MiniCssExtractPlugin.loader,
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
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../public/index.html") //配置插件使用我们定义的模板
      }),
      new webpackbar(),
      // 忽略moment.js中所有的locale文件
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 使用方式
      // const moment = require('moment');
      // 引入zh-cn locale文件
      // require('moment/locale/zh-cn');
      // moment.locale('zh-cn');
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          path.resolve(process.cwd(), "build/"),
          path.resolve(process.cwd(), "dist/")
        ]
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name][hash].css"
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: false
        }
      }),
      new ManifestPlugin(),
      new CopyWebpackPlugin([
        {
          from: path.resolve(process.cwd(), "public"),
          to: "./",
          ignore: ["index.html"]
        }
      ])
      // new BundleAnalyzerPlugin({
      //   analyzerMode: "server",
      //   analyzerHost: "127.0.0.1",
      //   analyzerPort: 8889,
      //   reportFilename: "report.html",
      //   defaultSizes: "parsed",
      //   openAnalyzer: true,
      //   generateStatsFile: false,
      //   statsFilename: "stats.json",
      //   statsOptions: null,
      //   logLevel: "info"
      // })
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
