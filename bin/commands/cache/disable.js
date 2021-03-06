/**
 *    _____ __
 *   / ___// /_  _____
 *   \__ \/ / / / / _ \
 *  ___/ / / /_/ /  __/
 * /____/_/\__, /\___/
 *       /____/
 *       Copyright 2017 Slye Development Team. All Rights Reserved.
 *       Licence: MIT License
 */

exports.command = 'disable';
exports.desc = 'Disable cache functionality for program';
exports.builder = function (yargs) {
};
exports.handler = function (argv) {
	var esy = require('../../loader')(argv);
	esy.cache.disable();
	console.log('Cache is now disable');
};