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

const glob      = require('glob');
const esy       = require('../src');
const colors    = require('colors');

const xmark     = '✗ ',
	checkmark   = '✓ ';

esy.configs.load('../tmp/esy.json');
esy.configs.set('cache_dir', '../tmp/.cache');
esy.cache.load();

glob('*/*.js', {cwd: __dirname}, function (files) {
	if(!files)
		return console.error((xmark + "No test available!").red);
	var passed  = 0;
	var failed  = 0;
	var i       = 0;
	var test    = function(){
		if(i    == files.length)
			return;
		var file    = files[i];
		var callback    = function(result){
			if(result){
				passed++;
				console.log(`${checkmark}Test #${i}<${file}> passed.`.green)
			}else {
				failed++;
				console.error(`${xmark}Test #${i}<${file}> failed.`.red)
			}
			i++;
			test();
		};
		try {
			require(file)(callback);
		}catch (e){
			callback(false);
		}
	};
	test();
});