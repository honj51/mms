module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      build: {
        src: ['./@/js/zepto.js', './@/js/event.js', './@/js/ajax.js', './@/js/mms.js'],
        dest: './@/js/mms.ingbaobei.com.js'
      }
    },
    uglify: {
      build: {
        src: ['./@/js/mms.ingbaobei.com.js'],
        dest: './@/js/mms.ingbaobei.com.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'uglify']);

};