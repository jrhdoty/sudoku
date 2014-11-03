module.exports = {
  dist: 'dist',

  app_files : {
    scripts: 'app/scripts/src/*.js',
    styles:  'app/styles/src/*.scss'
  }, 

  vendor_files: {
    scripts: [
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/lodash/dist/lodash.min.js'
    ]
  },

  tests: 'tests/**/*.js'
};