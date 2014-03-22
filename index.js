'use strict';

var createEventEmitter = require('bane').createEventEmitter;

var ImageRadioSelect = createEventEmitter({
	create: function () {
		var instance = Object.create(this);
		instance.init.apply(instance, [].slice.call(arguments));
		return instance;
	},

	init: function (container) {
		// To prevent text selection of the image when double clicking
		container.onselectstart = function() { return false; };
		container.onmousedown = function() { return false; };

		var radios = container.querySelectorAll('input[type=radio]');
		for (var i = 0; i < radios.length; i++) {
			this.setup(radios[i]);
		}
	},

	setup: function (radioButton) {
		var wrapper = radioButton.parentNode;

		radioButton.style.display = 'none';

		wrapper.addEventListener('click', this.handleClick.bind(this));
		wrapper.addEventListener('dblclick', this.handleDoubleClick.bind(this));
	},

	handleClick: function (e) {
		e.target.querySelector('input[type="radio"]').checked = true;
	},

	handleDoubleClick: function (e) {
		e.target.querySelector('input[type="radio"]').form.submit();
	}
});

if (typeof require === 'function' && typeof module !== 'undefined') {
	module.exports = ImageRadioSelect;
}
