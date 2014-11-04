module.exports = {
  dist: 'dist',

  build: {
    scripts: 'app/scripts',
    styles:  'app/styles'
  },

  app_files: {
    index:   './app/scripts/src/index.js',
    scripts: './app/scripts/src/*.js',
    styles:  './app/styles/src/*.scss'
  }, 

  vendor_files: {
    scripts: [
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/lodash/dist/lodash.min.js'
    ]
  },

  tests: 'tests/**/*.js'
};