module.exports = {
  dist: 'dist',

  build: {
    bundle:       './app/scripts/bundle.js',
    styles:       './app/styles/main.css',
    html:         './app/index.html',
    scripts_dir:  'app/scripts',
    styles_dir:   'app/styles'
  },

  app_files: {
    dir:     'app',
    index:   './app/scripts/src/index.js',
    scripts: './app/scripts/src/*.js',
    styles:  './app/styles/src/*.scss',
  }, 

  vendor_files: {
    scripts: [
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/lodash/dist/lodash.min.js'
    ]
  },

  tests: 'tests/**/*.js'
};