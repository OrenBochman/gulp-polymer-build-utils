'use strict';

const gulp = require('gulp');
const wct = require('web-component-tester/runner/test');

/**
 * Runs the tests in Web Component Tester
 * 
 * @param {Object} args Command line argument for tests
 * 
 * NB: This is a copy of the wct:local task from web-component-tester, with additional logic to override some configuration settings.
 */
exports.runWct = function runWct({ suite, browser, debug } = args) {
	const suitesPaths = suite.map(_suite => `test/${_suite}`);
	const wctConfig = {
		root: 'app',
		suites: suitesPaths,
		plugins: {
			local: {
				browsers: browser
			},
			sauce: false
		},
		verbose: debug,
		persistent: debug,
	};

	return wct.test(wctConfig).catch(function(error) {
		error = new Error(error.message || error);
		error.showStack = false;
		throw error;
	});
}

/**
 * Adds command line arguments for the tests
 * 
 * @param {Object} yargs Yargs instance
 */
exports.addYargs = function addWctYargs(yargs) {
	return yargs.option('browser', {
		describe: 'Browsers on which tests should run',
		default: ['chrome', 'firefox'],
		type: 'array',
	})
	.option('debug', {
		describe: 'True to keep browser open for debugging',
		default: false,
		type: 'boolean',
	})
	.option('suite', {
		describe: 'Test suites to executed',
		default: [''],
		type: 'array',
	});
}
