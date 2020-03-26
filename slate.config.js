/* eslint-disable */

// Configuration file for all things Slate.
// For more information, visit https://github.com/Shopify/slate/wiki/Slate-Configuration

const path = require('path');

module.exports = {
  'cssVarLoader.liquidPath': ['src/snippets/css-variables.liquid'],
  'webpack.babel.exclude': [/node_modules\/(?!(swiper|dom7|query-string|strict-uri-encode|split-on-first)\/).*/, /assets/],
  'webpack.extend': {
    optimization: {
      splitChunks: {
        chunks: 'all',
        minChunks: 2
      }
    }
  },
};
