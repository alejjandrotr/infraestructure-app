const path = require('path');

module.exports = {
  // Your existing configuration...
  resolve: {
    fallback: {
      fs: false,
      util: require.resolve('util/'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      url: require.resolve('url/'),
      zlib: require.resolve('browserify-zlib'),
    },
  },
};