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

const {compare}   = require('../tools');

exports.$basic  = function (assert) {
	var esy = `
	a = 0;
	timeout 100{
        console.log("Hi");
        a = 100;
    }
	`;
	var js  = `
	a = 0;
	setTimeout(function(){
		console.log("Hi")
		a = 100
	}, 100)
	`;
	compare(esy, js, 120).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$parameters  = function (assert) {
	var esy = `
	c = 0;
	timeout 100 <"Hello", "World!"> (a,b){
        console.log(a, b);
        c = 100;
    }
	`;
	var js  = `
	c = 0;
	setTimeout(function(a,b){
		console.log(a,b)    // Just test a real-world-example usage for comments
		c = 100
	}, 100, "Hello", "World!")
	`;
	compare(esy, js, 120).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};
