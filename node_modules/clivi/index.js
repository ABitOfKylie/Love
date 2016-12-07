"use strict";

var names = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
var namesBright = names.map(function(name) { return name + 'Bright'; });
var namesStyle = ['bold', 'dim', 'underline', 'blink', null, 'invert', 'hidden'];

var RESET = '\x1b[0m';

var Colors = {
	fg: {},
	bg: {},
	style: {},
};

// generate foreground normal colors
for (var i in names) {
	Colors.fg[names[i]] = +i + 30;
}
// generate foreground bright colors
for (var i in namesBright) {
	Colors.fg[namesBright[i]] = +i + 90;
}

// generate background normal colors
for (var i in names) {
	Colors.bg[names[i]] = +i + 40;
}
// generate background bright colors
for (var i in namesBright) {
	Colors.bg[namesBright[i]] = +i + 100;
}

// generate style attributes
for (var i in namesStyle) {
	if (!namesStyle[i])
		continue;
	Colors.style[namesStyle[i]] = +i + 1;
}

function formatColor(color) {
	color = color || {};
	var fg = Colors.fg[color.fg] || 39;
	var bg = Colors.bg[color.bg] || 49;
	var style = Colors.style[color.style] || 0;

//	var code = '\x1b';

	return '\x1b[' + style + ';' + fg + ';' + bg + 'm';
}

function colorize(str, colors) {
	if (!str || typeof colors !== 'object')
		return str;

	return formatColor(colors) + str + RESET;
}
module.exports = colorize;
module.exports.colors = Colors;
module.exports.names = names.concat(namesBright);
module.exports.styles = namesStyle.filter(function (name) { return !!name; });
