var Utils = {};

var slice = [].slice;

Utils.debounce = function(threshold, fn, immediate) {
	var timeout;
	if (threshold == null) {
		threshold = 0.1;
	}
	timeout = null;
	threshold *= 1000;
	return function() {
		var args, delayed, obj;
		args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
		obj = this;
		delayed = function() {
			if (!immediate) {
				fn.apply(obj, args);
			}
			return timeout = null;
		};
		if (timeout) {
			clearTimeout(timeout);
		} else if (immediate) {
			fn.apply(obj, args);
		}
		return timeout = setTimeout(delayed, threshold);
	};
};

Utils.throttle = function(delay, fn) {
	var timer;
	if (delay === 0) {
		return fn;
	}
	delay *= 1000;
	timer = false;
	return function() {
		if (timer) {
			return;
		}
		timer = true;
		if (delay !== -1) {
			setTimeout((function() {
				return timer = false;
			}), delay);
		}
		return fn.apply(null, arguments);
	};
};