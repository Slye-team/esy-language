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

var punctuators = "{ ( ) [ ] . ... ; , < > <= >= == != === !== + ‐ - * % ++ ‐‐ << >> >>> & | ^ ! ~ && || ? : = += ‐= *= %= <<= >>= >>>= &= |= ^= => ** **= / /= } from".split(' ');
punctuators = punctuators.map(c => c.trim());
punctuators.sort((a,b) => {
	return b.length - a.length;
});

/**
 * Returns true if input character is a punctuator
 * @param char
 * @return {boolean}
 */
function IsPunctuator(char) {
	return punctuators.indexOf(char) > -1;
}

IsPunctuator.chars  = punctuators;
IsPunctuator.regex  = '(' + punctuators.slice(1).map(a => a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')).join('|') + ')';
IsPunctuator.endsWith   = string => {
	if(string.endsWith('from'))
		return true;
	return (new RegExp(IsPunctuator.regex + '$', 'g')).test(string)
};
IsPunctuator.startsWith = string => {
	if(string.startsWith('from'))
		return true;
	return (new RegExp('^' + IsPunctuator.regex, 'g')).test(string)
};
module.exports  = IsPunctuator;