'use strict';

function getLibs(basePath, prod) {
    var target = '';

    if (prod) {
        target = '.min';
    }

    var scripts = [
        basePath + '/alertify.js/lib/alertify' + target + '.js',
        basePath + '/angular/angular' + target + '.js',
        basePath + '/angular-bootstrap/ui-bootstrap-tpls' + target + '.js',
        basePath + '/angular-translate/angular-translate' + target + '.js',
        basePath + '/angular-ui-router/release/angular-ui-router' + target + '.js',
        basePath + '/angular-cookies/angular-cookies' + target + '.js',
        basePath + '/lodash/dist/lodash' + target + '.js',
        basePath + '/ng-file-upload/angular-file-upload' + target + '.js',
        basePath + '/angular-md5/angular-md5' + target + '.js'
    ];

    if (!prod) {
        scripts.push(basePath + '/angular-mocks/angular-mocks.js');
    }

    return scripts;
}

module.exports = function (grunt) {
    grunt.initConfig({
        meta: {
            bowerPath: 'bower_components',
            assetsPath: 'src/assets',
            imagesPath: 'src/images',
            jsPath: 'src/js',
            lessPath: 'src/less',
            cssPath: 'src/css',
            fontsPath: 'src/fonts',
            buildPath: 'src/build',
            libsBundle: '<%= meta.buildPath %>/libs.js',
            appBundle: '<%= meta.buildPath %>/app.js'
        },

        browserify: {
            dev: {
                options: {
                    watch: true,
                    keepAlive: true,
                    browserifyOptions: {
                        debug: true
                    }
                },
                files: {
                    '<%= meta.appBundle %>': '<%= meta.jsPath %>/app.js'
                }
            },
            prod: {
                files: {
                    '<%= meta.appBundle %>': '<%= meta.jsPath %>/app.js'
                }
            }
        },

        clean: {
            build: ['<%= meta.buildPath %>', '<%= meta.cssPath %>', '*.log']
        },

        concat: {
            options: {
                separator: ';'
            },
            dev: {
                files: {
                    '<%= meta.libsBundle %>': getLibs('<%= meta.bowerPath %>')
                }
            },
            prod: {
                files: {
                    '<%= meta.libsBundle %>': getLibs('<%= meta.bowerPath %>', true)
                }
            }
        },

        concurrent: {
            dev: {
                tasks: ['autoprefixer', 'browserify:dev', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            },
            prod: {
                tasks: ['uglify:prod', 'cssmin:prod'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        jshint: {
            options: {
                jshintrc: true
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            bundles: {
                src: '<%= meta.jsPath %>/**/*.js'
            }
        },

        less: {
            styles: {
                options: {
                    paths: [
                        '<%= meta.bowerPath %>',
                        '<%= meta.lessPath %>'
                    ]
                },
                files: {
                    '<%= meta.cssPath %>/styles.css': '<%= meta.lessPath %>/styles.less'
                }
            }
        },

        uglify: {
            prod: {
                files: {
                    '<%= meta.appBundle %>': '<%= meta.appBundle %>'
                }
            }
        },

        watch: {
            less: {
                options: {
                    livereload: true
                },
                files: ['<%= meta.lessPath %>/**/*.less'],
                tasks: ['less', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: ['<%= meta.buildPath %>/*.js']
            }
        },

        csscomb: {
            dev: {
                options: {
                    config: 'csscomb.json'
                },
                files: {
                    '<%= meta.lessPath %>/styles.less': '<%= meta.lessPath %>/styles.less'
                }
            }
        },

        cssmin: {
            prod: {
                files: {
                    '<%= meta.cssPath %>/styles.css': '<%= meta.cssPath %>/styles.css'
                }
            }
        },

        autoprefixer: {
            styles: {
                options: {
                    browsers: ['last 3 versions'],
                    cascade: false,
                    remove: false
                },
                src: '<%= meta.cssPath %>/styles.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-csscomb');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('prod', ['clean', 'concat:prod', 'less', 'autoprefixer', 'browserify:prod', 'concurrent:prod']);
    grunt.registerTask('dev', ['clean', 'concat:dev', 'csscomb', 'less', 'concurrent:dev']);
};
