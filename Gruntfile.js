/* jslint node:true */
'use strict';

module.exports = function(grunt){
	require('matchdep').filterDev(['grunt-*', '!grunt-cli']).forEach(grunt.loadNpmTasks);

	var MOCHA_OPTIONS = {
		globals : ['expect'],
		timeout : 7000,
		ignoreLeaks : false,
		ui : 'bdd',
		reporter : 'spec'
	};
	grunt.initConfig({
		config : {
			testdir : 'test/**/*Spec.js'
		},
		node_mocha : {
			test : {
				src : ['<%= config.testdir %>'],
				options : {
					mochaOptions : MOCHA_OPTIONS
				}
			},
			"test-cov" : {
				src : ['<%= config.testdir %>'],
				options : {
					mochaOptions : MOCHA_OPTIONS,
					coverageFolder : 'test-coverage', // output folder for test coverage
					reportFormats : ['html','cobertura','text'],
					print : 'true'
				}
			}
		}, 
		watch : {
			"watch-test" : {
				files : ['lib/*.js','test/**/*.*'],
				tasks : ['node_mocha:test']
			},
			"watch-test-cov" : {
				files : ['lib/*.js','test/**/*.*'],
				tasks : ['node_mocha:test-cov']
			}
		},
		clean : {
			test_coverage : {
				files : ['test-coverage']
			}
		}
	});

	grunt.registerTask('default' , ['test']);
	grunt.registerTask('test', ['node_mocha:test','watch:watch-test']);
	grunt.registerTask('test-cov', ['node_mocha:test-cov','watch:watch-test-cov']);

};