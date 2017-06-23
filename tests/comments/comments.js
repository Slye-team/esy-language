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

exports.$oneLineComments    = function (assert) {
	var code    = `
	// This is a comment
	console.log("Hello World!") // Comment at the end of code
	var a = 5;
	// Another Comment
	a++; // Sth
	console.log(a);
	// console.log("This line is a comment")
	`;
	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$multiline  = function (assert) {
	var code    = `
	/*
	Multi line comment
	This line is comment
	*/
	console.log("Hi")
	/*At the beginning of file*/ var a = 68;
	a++;    /* Multi line comment*/
	console.log(a /* Some comments here*/);
	`;
	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$mixed  = function(assert) {
	var code    = `
	// Hooooo
	var b = 9; // Sth
	console.log(b) // Other things
	/*
	Multi line comment
	This line is comment
	*/
	b *= 8  // B = B * 8 = 9 * 8 = 72
	b -= 3  // B = B - 3 = 72 - 3 = 69
	console.log("Hi") /* Some comments*/
	//
	//
	// Joooon!!!
	//
	//
	/*At the beginning of file*/ var a = 68;
	a++;    /* Multi line comment*/
	console.log(a /* Some comments here*/);
	if(a == b){
		console.log("I love", a)
	}
	`;
	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};