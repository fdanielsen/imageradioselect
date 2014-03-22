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

	/**
	 * Handles clicks on the container element for radio buttons.
	 *
	 * Selects the radio button inside, and emits and event informing of the change.
	 */
	handleClick: function (e) {
		var radio = e.currentTarget.querySelector('input[type="radio"]');
		radio.checked = true;
		this.emit('select', radio);
	},

	/**
	 * Handles double click on container element for radio buttons.
	 *
	 * XXX: Should possibly not be here as it's a magic feature of this module.
	 */
	handleDoubleClick: function (e) {
		var radio = e.currentTarget.querySelector('input[type="radio"]');
		this.emit('save', radio);
		radio.form.submit();
	}
});

if (typeof require === 'function' && typeof module !== 'undefined') {
	module.exports = ImageRadioSelect;
}
