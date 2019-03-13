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


	var dispatchEvent = function(target, eventRegistry, eventObject) {

		var callbacks = eventRegistry[eventObject.type];

		if (!callbacks) return;

		eventObject.currentTarget = target;
		eventObject.target || (eventObject.target = target);

		var len = callbacks.length;

		for (var i = 0; i < len; i++)
			callbacks[i](eventObject);


	};


	/**
	 * Event Emitter base class. All methods are defined in constructor.
	 * @class
	 */
	var EventEmitter = function() {

		var eventRegistry = {};

		/**
		 * Binds a callback to an event. The callback will be called with the
		 * eventObject dispatched by the dispatchEvent method.
		 *
		 * @method addEventListener
		 * @memberof EventEmitter
		 * @param  {string}   eventName The event to which the callback should be
		 * bound.
		 * @param  {Function} callback  The callback to be called when the event
		 * is triggered.
		 */
		this.addEventListener = function(eventName, callback) {

			addEventListener(eventRegistry, eventName, callback);

		};


		/**
		 * Removes a callback from the callback list of an event.
		 *
		 * @method removeEventListener
		 * @memberof EventEmitter
		 * @param  {string}   eventName The event from which the callback should
		 * be removed.
		 * @param  {Function} callback  The callback to be called when the event
		 * is triggered.
		 */
		this.removeEventListener = function(eventName, callback) {

			removeEventListener(eventRegistry, eventName, callback);

		};


		/**
		 * Fires the callbacks of the event specified by the type property of the
		 * eventObject.
		 *
		 * @method dispatchEvent
		 * @memberof EventEmitter
		 * @param  {Object} eventObject The event object to be passed to the
		 * callbacks. Its type property defines which event will be fired.
		 */
		this.dispatchEvent = function(eventObject) {

			dispatchEvent(this, eventRegistry, eventObject);

		};

	};


	return EventEmitter;

})();


module.exports = EventEmitter;
