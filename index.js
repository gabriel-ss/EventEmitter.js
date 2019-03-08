var EventEmitter = (() => {


	var addEventListener = function(eventRegistry, eventName, callback) {

		(eventRegistry[eventName] || (eventRegistry[eventName] = []))
			.push(callback);

	};

	var removeEventListener = function(eventRegistry, eventName, callback) {

		var callbacks = eventRegistry[eventName];

		if (callbacks)
			callbacks.splice(callbacks.indexOf(callback), 1);

	};


	var dispatchEvent = function(eventRegistry, eventObject) {

		var callbacks = eventRegistry[eventObject.type];

		if (!callbacks) return;

		var len = callbacks.length;

		for (var i = 0; i < len; i++)
			callbacks[i](eventObject);


	};


	var EventEmitter = function() {

		var eventRegistry = {};


		this.addEventListener = function(eventName, callback) {

			addEventListener(eventRegistry, eventName, callback);

		};

		this.removeEventListener = function(eventName, callback) {

			removeEventListener(eventRegistry, eventName, callback);

		};

		this.dispatchEvent = function(eventObject) {

			dispatchEvent(eventRegistry, eventObject);

		};

	};


	return EventEmitter;

})();


module.exports = EventEmitter;
