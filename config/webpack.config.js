const publicPath = 'public';
// Node os module
// The os module provides a number of operating system-related utility methods.
// It can be accessed using:
const os = require('os');
// Using a single monolithic configuration file impacts comprehension and
// removes any potential for reusability.
// As the needs of your project grow, you have to figure out the means to manage
// webpack configuration more effectively.

// Composing Configuration by Merging
// If the configuration file is broken into separate pieces, they have to be
// combined again somehow. Normally this means merging objects and arrays.
// To eliminate the problem of dealing with Object.assign and Array.concat,
// webpack-merge was developed.
// 
// webpack-merge does two things: it concatenates arrays and merges objects
// instead of overriding them allowing composition.
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
// This is an exact copy of the NodeJS ’path’ module published to the NPM registry.
const PATHS = {
  app: __dirname,
  build: `${__dirname}/${publicPath}`,
  fixedPath: '/'
};
// Split per Configuration Target
// If you split the configuration per target, you could end up with a
// file structure as below:
// .
// └── config
//     ├── webpack.common.js
//     ├── webpack.development.js
//     ├── webpack.parts.js
//     └── webpack.production.js
// In this case, you would point to the targets through
// webpack --config parameter and merge common configuration through
// module.exports = merge(common, config);.
const commonConfig = merge([
  parts.loadResolver(),
  parts.loadAntD(),
  parts.loadSvgs({exclude: /node_modules/ }),
  parts.loadMds({exclude: /node_modules/ }),
  parts.loadIcos({exclude: /node_modules/ })
]);

const productionConfig = merge([
  {
    bail: false,
    devtool: 'source-map',
    entry: {
      application: ['./app/index.js']
    },
    output: {
      filename: '[name].js',
      path: PATHS.build,
      pathinfo: true,
      publicPath: PATHS.fixedPath
    },
  },
  parts.setNoErrors(),
  parts.loadJavaScript({ include: __dirname + '/', exclude: /node_modules/ }),
  parts.minifyJavaScript(),
  parts.clean(PATHS.build),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true
      },
      // Run cssnano in safe mode to avoid
      // potentially unsafe transformations.
      safe: true
    }
  }),
  parts.loadProdCss(),
  parts.loadImages({
    options: {
      limit: 1024,
      name: '[name].[ext]'
    }
  }),
  parts.setCompression(),
]);

const developmentConfig = merge([
  {
    // bail - boolean
    // Fail out on the first error instead of tolerating it.
    // By default webpack will log these errors in red in the terminal,
    // as well as the browser console when using HMR, but continue bundling.
    bail: true,
    watch: true,
    entry: {
      application: ['./app/index.js']
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[id].js',
      path: PATHS.build,
      pathinfo: true,
      publicPath: PATHS.fixedPath
    },
    devtool: 'source-map'
  },
  parts.setEnvVariables({
    'process.env': {
      NODE_ENV: '"development"',
      styleguideEnabled: true
    }
  }),
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT
  }),
  parts.loadJavaScript({ include: __dirname + '/', exclude: /node_modules/ }),
  parts.loadDevCss({
    exclude: /typography/,
    options: {
      sourceMap: true,
      minimize: true
    }
  }),
  parts.loadDevCss({
    include: /typography/,
    options: {
      minimize: true
    }
  }),
  parts.loadImages(),
  parts.generateSourceMaps()
]);

module.exports = mode => {
  console.log('============= mode => ' + mode + ' =============');
  let modeConfig = mode === 'production' ? productionConfig : developmentConfig;
  return merge(commonConfig, modeConfig, { mode });
};