module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['scripts/*.js'],
        dest: 'application.js'
      },
    }
  });
};

grunt.loadNpmTasks('grunt-co ntrib-concat');
