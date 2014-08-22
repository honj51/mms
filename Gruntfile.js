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
    },
    less: {
      production: {
        files: {
          'css/qi.min.css': ['css/qi.css'],
          'css/index.min.css': ['css/index.css']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['concat', 'uglify', 'less']);

};