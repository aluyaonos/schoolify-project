// resolve.alias
// Create aliases to import or require certain modules more easily. For example, to alias a bunch of commonly used src/ folders:
//
// alias: {
//   Utilities: path.resolve(__dirname, 'src/utilities/'),
//   Templates: path.resolve(__dirname, 'src/templates/')
// }
// Now, instead of using relative paths when importing like so:
//
// import Utility from '../../utilities/utility';
// you can use the alias:
//
// import Utility from 'Utilities/utility';
// https://webpack.js.org/configuration/resolve/
const path = require('path');
exports.loadResolver = () => ({
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'app/')
    }
  }
});

// The first step towards configuring Babel to work with webpack is to set up babel-loader. It takes the code and turns it into a format older browsers can understand. Install babel-loader and include its peer dependency babel-core:
exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include,
        exclude,
        use: 'babel-loader'
      }
    ]
  }
});


// This section is specific to using Ant-Design React Component Library
// less-vars-to-js package:
// Takes in the contents of a less file as a string and returns
// an object containing all the variables it found.
const fs = require('fs');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './ant-theme-vars.less'), 'utf8'));
exports.loadAntD = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.less$/,
        include,
        exclude,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              modifyVars: themeVariables,
              javascriptEnabled: true
            }
          }

        ]
      }
    ]
  }
});

// webpack needs two additional components for processing HTML: html-webpack-plugin and html-loader.
const HtmlWebPackPlugin = require('html-webpack-plugin');
exports.loadHtml = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.html$/,
        include,
        exclude,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
});

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: 'errors-only',
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    open: true,
    overlay: false
  }
});

// webpack doesn’t know to extract CSS to a file.
//
// In the past it was a job for extract-text-webpack-plugin.
//
// Unfortunately said plugin does not play well with webpack 4.
//
// According to Michael Ciniawsky:
//
// extract-text-webpack-plugin reached a point where maintaining it become too much of a burden and it’s not the first time upgrading a major webpack version was complicated and cumbersome due to issues with it
//
// mini-css-extract-plugin is here to overcome those issues.
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// This is the version with MiniCssExtractPlugin
exports.loadProdCss = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        include,
        exclude,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
});

exports.loadDevCss = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        include,
        exclude,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options
          },
          'sass-loader'
        ]
      }
    ]
  }
});

// Frameworks like Bootstrap tend to come with a lot of CSS. Often you use only a small part of it. Typically, you bundle even the unused CSS. It's possible, however, to eliminate the portions you aren't using.
//
// PurifyCSS is a tool that can achieve this by analyzing files. It walks through your code and figures out which CSS classes are being used. Often there is enough information for it to strip unused CSS from your project. It also works with single page applications to an extent.
const PurifyCSSPlugin = require('purifycss-webpack');

exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurifyCSSPlugin({ paths })]
});

// url-loader is a good starting point and it's the perfect option for development purposes, as you don't have to care about the size of the resulting bundle. It comes with a limit option that can be used to defer image generation to file-loader after an absolute limit is reached. This way you can inline small files to your JavaScript bundles while generating separate files for the bigger ones.
exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff2)$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options
        }
      }
    ]
  }
});


exports.loadIcos = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.ico$/,
        include,
        exclude,
        use: {
          loader: 'file-loader?name=[name].[ext]'
        }
      }
    ]
  }
});

exports.loadMds = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.md$/,
        include,
        exclude,
        use: 'raw-loader'
      }
    ]
  }
});

// Webpack allows a couple ways to load SVGs. However, the easiest way is through file-loader as follows:
//
// {
//   test: /\.svg$/,
//   use: "file-loader",
// },
// react-svg-loader emits SVGs as React components meaning you could end up with code like <Image width={50} height={50}/> to render a SVG in your code after importing it.
exports.loadSvgs = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.svg$/,
        include,
        exclude,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [{ cleanupIDs: false }],
                floatPrecision: 2
              }
            }
          }
        ]
      }
    ]
  }
});

// When your source code has gone through transformations, debugging becomes a problem. When debugging in a browser, how to tell where the original code is? Source maps solve this problem by providing a mapping between the original and the transformed source code. In addition to source compiling to JavaScript, this works for styling as well.
//
// One approach is to skip source maps during development and rely on browser support of language features. If you use ES2015 without any extensions and develop using a modern browser, this can work. The advantage of doing this is that you avoid all the problems related to source maps while gaining better performance.
//
// If you are using webpack 4 and the new mode option, the tool will generate source maps automatically for you in development mode. Production usage requires attention, though.
exports.generateSourceMaps = () => ({
  devtool: 'source-map'
});

// Cleaning the Build Directory#
// The current setup doesn't clean the build directory between builds. As a result, it keeps on accumulating files as the project changes. Given this can get annoying, you should clean it up in between.
//
// Another nice touch would be to include information about the build itself to the generated bundles as a small comment at the top of each file including version information at least.
const CleanWebpackPlugin = require('clean-webpack-plugin');
exports.clean = path => ({
  plugins: [new CleanWebpackPlugin([path])]
});

// This plugin uses UglifyJS v3 (uglify-es) to minify your JavaScript
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
exports.minifyJavaScript = () => ({
  optimization: {
    minimizer: [new UglifyWebpackPlugin({ sourceMap: true, extractComments: true })]
  }
});

// Minifying CSS
// css-loader allows minifying CSS through cssnano. Minification needs to be enabled explicitly using the minimize option. You can also pass cssnano specific options to the query to customize the behavior further.
//
// clean-css-loader allows you to use a popular CSS minifier clean-css.
//
// optimize-css-assets-webpack-plugin is a plugin based option that applies a chosen minifier on CSS assets. Using ExtractTextPlugin can lead to duplicated CSS given it only merges text chunks. OptimizeCSSAssetsPlugin avoids this problem by operating on the generated result and thus can lead to a better result.
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false
    })
  ]
});

// Setting process.env.NODE_ENV
// As before, encapsulate this idea to a function. Due to the way webpack replaces the free variable, you should push it through JSON.stringify. You end up with a string like '"demo"' and then webpack inserts that into the slots it finds:
const webpack = require('webpack');

exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [new webpack.DefinePlugin(env)]
  };
};

// Best approach to pass Environment Variables
exports.setEnvVariables = obj => {
  return {
    plugins: [new webpack.DefinePlugin(obj)]
  };
};

// Use the NoEmitOnErrorsPlugin to skip the emitting phase whenever there are errors while compiling. This ensures that no assets are emitted that include errors. The emitted flag in the stats is false for all assets.
exports.setNoErrors = () => {
  return new webpack.NoEmitOnErrorsPlugin();
};

// Prepare compressed versions of assets to serve them with Content-Encoding
const CompressionPlugin = require('compression-webpack-plugin');
exports.setCompression = () => {
  return {
    plugins: [new CompressionPlugin()]
  };
};
// This module will help you:
//
// Realize what's really inside your bundle
// Find out what modules make up the most of its size
// Find modules that got there by mistake
// Optimize it!
// And the best thing is it supports minified bundles! It parses them to get real size of bundled modules. And it also shows their gzipped sizes!
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
exports.setAnalyzer = () => {
  return {
    plugins: [new BundleAnalyzerPlugin()]
  };
};

// This plugin will cause hashes to be based on the relative path of the module, generating a four character string as the module id. Suggested for use in production.
exports.setHashModuleIds = () => {
  return {
    plugins: [new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    })]
  };
};