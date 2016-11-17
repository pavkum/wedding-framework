'use strict';

module.exports = function (grunt) {

  var config = {
    debug: '.tmp',
    build: 'dist',
    templates: '.templates'
  };

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    config: config,
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['js/**/*.js'],
        tasks: ['jshint', 'concat:debug'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      html: {
        files: ['js/app/**/*.html'],
        tasks: ['browserify:debug'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      styles: {
        files: ['js/app/**/*.css'],
        tasks: ['browserify:debug'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        tasks: ['copy:debug'],
        files: [
          'html/index.html',
          'images/*.*',
          'manifest.json',
          '_locales/*.json'
        ]
      }
    },

    clean: {
      debug: ['<%= config.debug %>'],
      build: ['<%= config.build %>']
    },

    // Grunt server and debug server settings
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost',
        open: true
      },
      debug: {
        options: {
          open: false,
          base: [
            '.tmp'
          ]
        }
      }
    },

    browserify: {
      options: {
        debug: true,
        alias: {
          'templates': './.templates/templates.js'
        },
        transform: [
          ['debowerify', {}],
          ['stringify', {
            appliesTo: {
              includeExtensions: ['.html', '.css']
            }
          }]
        ]
      },
      debug: {
        files: [{
          '<%= config.debug %>/scripts/index.js': ['js/app/app.js']
        }]
      },
      build: {
        files: [{
          '<%= config.build %>/scripts/index.js': 'js/app/app.js'
        }]
      }
    },

    copy: {
      debug: {
        files: [{
          expand: true,
          cwd: '.',
          dest: '<%= config.debug %>',
          src: [
            'images/**.*'
          ]
        }, {
          expand: true,
          cwd: 'html',
          dest: '<%= config.debug %>',
          src: [
            'index.html',
          ]
        }]
      },
      build: {
        files: [{
          expand: true,
          cwd: '.',
          dest: '<%= config.build %>',
          src: [
            'manifest.json',
            'images/**.*',
            '_locales/**/*.*'
          ]
        }, {
          expand: true,
          cwd: 'html',
          dest: '<%= config.build %>',
          src: [
            'index.html',
          ]
        }]
      }
    },

    concat: {
      debug: {
        files: {
          '<%= config.debug %>/styles/app.css': 'styles/*.css',
          '<%= config.debug %>/scripts/wedding.js': 'js/**/*.js'
        }
      },
      build: {
        files: {
          '<%= config.build %>/scripts/background.js': [
            'js/background/*.js', '!js/background/chromereload.js'
          ],
          '<%= config.build %>/scripts/prime.js': 'js/lib/*.js',
          '<%= config.build %>/styles/app.css': 'styles/*.css'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        reporterOutput: ''
      },
      all: [
        'Gruntfile.js',
        'js/**/*.js',
        'test/**/*.js'
      ]
    },

    handlebars: {
      options: {
        namespace: 'JST',
        commonjs: true
      },
      compile: {
        files: {
          '<%= config.templates %>/templates.js': 'js/app/**/*.hbs'
        }
      }
    }
  });

  grunt.registerTask('debug', [
    'clean:debug',
    'jshint',
    'copy:debug',
    'concat:debug',
    'connect:debug',
    'watch'
  ]);


  grunt.registerTask('build', [
    'clean:build',
    'jshint',
    'handlebars',
    'browserify:build',
    'copy:build',
    'concat:build'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
