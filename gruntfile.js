module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // compile style.scss and inline.scss
    sass: {
      dist: {
        files: {
          "style.css": "style.scss",
        },
        options: {
          style: 'compressed'
          // style: 'nested'
        },
      }
    },

    // postcss for autoprefixer
    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({
            browsers: ['last 3 versions']
          })
        ]
      },
      dist: {
        src: '*.css'
      }
    },


    // watch html, css and js
    watch: {
      css: {
        files: ['*.scss'],
        tasks: ['sass:dist','postcss:dist'],
      },
    },

  });

  // Load the plugin required for building the theme
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('default', ['watch','sass','postcss']);
};
