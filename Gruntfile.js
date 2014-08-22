module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      basic_and_extras: {
        files: {
          'js/mms.ingbaobei.com.qi.js': ['js/zepto.js', 'js/event.js', 'js/ajax.js', 'audiojs/audio.min.js', 'js/qi.js'],
          'js/mms.ingbaobei.com.index.js': ['js/zepto.js', 'js/event.js', 'js/ajax.js', 'js/index.js']
        },
      }
    },
    uglify: {
      my_target: {
        files: {
          'js/mms.ingbaobei.com.qi.min.js': ['js/mms.ingbaobei.com.qi.js'],
          'js/mms.ingbaobei.com.index.min.js': ['js/mms.ingbaobei.com.index.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'uglify']);

};