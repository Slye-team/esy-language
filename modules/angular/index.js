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

/**
 * Support for angular.js
 * This version (0.0.8) supports:
 *  config
 *  controller
 * 	run
 *	directive
 *	filter
 *	factory
 *	provider
 *	service
 *	component
 *	decorator
 *	$timeout/$interval
 * @param esy
 */
function angular(esy) {
	let {block, compile, regex} = esy;

	const pattern   = new regex(
		regex.beginning(),
		regex.group(
			regex.text('$'),
			regex.identifier()
		).capture(),
		regex.text('.'),
		regex.text('config', 'controller', 'run', 'directive', 'filter', 'factory', 'provider', 'service', 'component', 'decorator').capture(),
		regex.group(
			regex.text('<'),
			regex.callParameters().capture(),
			regex.text('>')
		).optional(),
		regex.group(
			regex.text('('),
			regex.arguments().optional().capture(),
			regex.text(')')
		),
		regex.end()
	).autoSpace();

	block(pattern.toObj(), (matches, {body}) => {
		let [, app, func, param1, modules] = matches;
		body = compile(body);
		modules	= modules || '';
		param1 = (param1 ? param1.length : 0) > 0 ? param1 + ', ' : '';
		let module_names    = "'" + modules.split(',').map(a => a.trim()).join("','") + "'" + ',';
		if(module_names.trim() == "'',")
			module_names	= '';
		return `${app}.${func}(${param1}[${module_names}function(${modules}){
			${body}
		}])`;
	});


	// Angular timer

	var timePattern	= (new regex(
		regex.beginning(),
		regex.text('$'),

		regex.text('timeout', 'interval').capture('type'),

		regex.rightHand().optional().capture('time'),

		regex.group(
			regex.text('<'),
			regex.callParameters().capture('parameters'),
			regex.text('>')
		).optional(),

		regex.group(
			regex.text('('),
			regex.arguments().capture('arguments'),
			regex.text(')')
		).optional(),

		regex.end()
	)).autoSpace();

	esy.block(timePattern.toObj(), (matches, block) => {
		var func        = matches[1].toLowerCase() == 'timeout' ? '$timeout' : '$interval';
		var callback    = esy.compile(block.body);
		var delay       = matches[2] || '0';
		if(delay.endsWith(';'))
			delay = delay.substr(0, delay.length - 1);
		var pass_args   = matches[3];
		var func_args   = matches[4];
		var re  = func + '(function(';
		if(func_args)
			re  += func_args;
		re += '){' + callback + '}, ' + delay;
		if(pass_args)
			re += ',' + pass_args;
		re += ');';
		return re;
	});

	return {
		name    : "Esy Angular",
		version : "0.0.8",
		author  : "Slye Development Team"
	};
}
module.exports = angular;
