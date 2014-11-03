module.exports = {
  dist: 'dist',

  app_files : {
    scripts: 'app/scripts/*.js',
    styles:  'app/styles/*.scss'
  }, 

  vendor_files: {
    scripts: [
      'bower_components/jquery/dist/jquery.min.js'
    ]
  },

  tests: 'tests/**/*.js'
};