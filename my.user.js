// ==UserScript==
// @name         dima74-debug
// @namespace    http://github.com/dima74/
// @version      0.1
// @description  This script is in debug.
// @author       dima74
// @license      MIT
// @match        http://agar.io/*
// @grant        none
// @run-at       document-body
// ==/UserScript==

// minimap dom
if ($('#mini-map-wrapper').length === 0){
	var wrapper = $('<div>').attr('id', 'mini-map-wrapper').css({
		position: 'fixed',
		bottom: 50,
		right: 10,
		width: 300,
		height: 300,
		background: 'rgba(128, 128, 128, 0.58)'
	});

	var mini_map = $('<canvas>').attr({
		id: 'mini-map',
		width: 300,
		height: 300
	}).css({
		width: '100%',
		height: '100%',
		position: 'relative'
	});

	wrapper.append(mini_map).appendTo(document.body);

	window.mini_map = mini_map[0];
}