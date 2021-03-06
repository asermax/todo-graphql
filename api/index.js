/**
 * Entry Script
 */

if (process.env.NODE_ENV === 'production') {
  // In production, serve the webpacked server file.
  require('./dist/bundle.js');
} else {
  // Babel polyfill to convert ES6 code in runtime
  require('babel-register');

  require('./src/server');
}
