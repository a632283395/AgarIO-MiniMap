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

(function() {
	var $ = window.jQuery;
	var render_timer = null;
	
	window.WebSocket = function(url, protocols) {
		console.log('Listen');
	}
	
	function miniMapRender() {
		var canvas = window.mini_map;
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		var w = canvas.width;
		var h = canvas.height;
		
		var x = 0.5 * w;
		var y = 0.5 * h;
		var size = 0.1 * w;
		
		ctx.beginPath();
		ctx.arc(
			x,
			y,
			size,
			0,
			2 * Math.PI,
			false
		);
		ctx.closePath();
		ctx.fillStyle = '#00ffff';
		ctx.fill();
		
		ctx.strokeStyle = 'green';
		drawLine(ctx, 0, 0, w, h);
		drawLine(ctx, 0, h, w, 0);
		ctx.strokeStyle = 'yellow';
		drawLine(ctx, w/2, 0, w/2, h);
		drawLine(ctx, 0, h/2, w, h/2);
	}
	
	function drawLine(canvas, x0, y0, x1, y1) {
		canvas.beginPath();
		canvas.moveTo(x0, y0);
		canvas.lineTo(x1, y1);
		canvas.stroke();
	}
	
	function miniMapInit() {
		// minimap dom
		if ($('#mini-map-wrapper').length === 0) {
			var wrapper = $('<div>').attr('id', 'mini-map-wrapper').css({
				position: 'fixed',
				bottom: 20,
				right: 20,
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

		// minimap renderer
		if (render_timer === null)
			render_timer = setInterval(miniMapRender, 1000 / 30);
	}
	
	$(window.document).ready(function() {
		miniMapInit();
	});
})();