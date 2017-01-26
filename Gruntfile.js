module.exports = function(grunt) {

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bower_concat: {
        dist: {
            dest: {
                js: 'build/bower_components.js',
                css: 'build/bower_components.css'
            },
            // cssDest: 'build/_bower.css',
            dependencies: {
                'angular': 'jquery'
            },
            mainFiles: {
                'bootstrap': ['dist/css/bootstrap.css', 'dist/js/bootstrap.js']
            }
        }
    },

    clean: ['build'],

    concat: {
        dist: {
            files: {
                // 'build/<%= pkg.name %>.js': ['app/**/*.module.js', 'app/**/*.js', '!app/**/*.spec.js', '!app/bower_components/**'],
                'build/<%= pkg.name %>.css': ['app/**/*.css', '!app/bower_components/**']
            }
        }
    },

    copy: {
        dist: {
            files: [{
                expand: true,
                cwd: 'app/',
                src: ['**/*.template.html', '**/*.json', '**/*.jpg', '!bower_components/**'],
                dest: 'build/'
            }]
        },
    },

    injector: {
        options: {
            // Task-specific options go here. 
             relative: true,
             addRootSlash: false,
             template: 'app/index.html'
        },
        dist: {
            files: {
                'build/index.html': [
                    'build/bower_components.css',
                    'build/bower_components.js',
                    'build/<%= pkg.name %>.css', 
                    'build/<%= pkg.name %>.js', 
                ],
            }
        },
    },

    ts: {
      default : {
        src: ['app/**/*.module.{js,ts}', 'app/**/*.{js,ts}', '!app/**/*.spec.{js,ts}', '!app/bower_components/**'],
        out: 'build/<%= pkg.name %>.js',
        options: {
            allowJs: true,
            inlineSourceMap: true,
            inlineSources: true
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

  });

  // Load the plugins
  require('load-grunt-tasks')(grunt);

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

  // Tasks
  grunt.registerTask('dist', ['clean', 'bower_concat', 'concat', 'ts', 'copy', 'injector']);

};