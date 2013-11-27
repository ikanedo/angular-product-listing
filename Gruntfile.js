/* jshint node: true */

module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration.
    clean : ['app/assets/js', 'app/assets/fonts', 'app/assets/css'],

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['js/*.js']
      },
      test: {
        src: ['tests/unit/*.js']
      }
    },

    concat: {
      productList: {
        src: [
          'js/productList/**/*.js',
        ],
        dest: 'app/assets/js/productList.js'
      }
    },

    uglify: {
      options : {
        mangle : false
      },
      productList: {
        src: ['<%= concat.productList.dest %>'],
        dest: 'app/assets/js/productList.js'
      }
    },

    recess: {
      options: {
        compile: true
      },
      productList: {
        options: {
          compress: true
        },
        src: ['less/productList.less'],
        dest: 'app/assets/css/productList.css'
      },
    },

    copy: {
      main : {
        files : [
          {
            expand: true,
            src: ["fonts/*"],
            dest: 'app/assets/'
          },
          {
            expand: true,
            src: ["js/vendors/*"],
            dest: 'app/assets/'
          }
        ]
      }
    },

    watch: {
      options : {
        livereload : true          
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test']
      },
      recess: {
        files: 'less/*.less',
        tasks: ['recess']
      }
    },

    karma : {
      prod: {
        configFile : 'config/karma.conf.js'
      },
      dev: {
        configFile : 'config/karma.conf.js',
        autoWatch : true,
        singleRun : false,
        browsers : ['Chrome']
      },
    },

  });


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-devtools'); 
  grunt.loadNpmTasks('grunt-karma');

  // Test task.
  var testSubtasks = ['dist-css', 'jshint', 'karma:prod'];
  
  grunt.registerTask('test', testSubtasks);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['recess']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'dist-css', 'copy', 'dist-js']);

  // Default task.
  grunt.registerTask('default', ['test', 'dist']);

};