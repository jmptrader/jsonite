/**
 * @project jsonite - https://github.com/robertleeplummejr/jsonite
 * @author RobertLeePlummerJr@gmail.com
 * Licensed under MIT
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

/**
 * @namespace
 */
var jsonite = (function() {
	var jsonite = {
		received: {},
		counts: {},
		parts: {},
		callbacks: {},

		/**
		 * @param {String|Number} name
		 * @param {Object|Array} json
		 * @param {Number} partCount
		 * @param {Function} callback
		 */
		init: function(name, json, partCount, callback) {
			this.checkStart(name);

			this.parts[name][0] = json;
			this.callbacks[name] = callback;
			this.received[name]++;

			this.checkComplete(name);
		},

		/**
		 *
		 * @param {String|Number} name
		 * @param {Number} partIndex
		 * @param {Object|Array} json
		 */
		insertPart: function(name, partIndex, json) {
			this.checkStart(name);

			this.parts[name][partIndex] = json;
			this.received[name]++;

			this.checkComplete(name);
		},

		/**
		 *
		 * @param {String|Number} name
		 */
		checkStart: function(name) {
			if (this.parts[name] === undefined) {
				this.parts[name] = [];
				this.counts[name] = 0;
				this.received[name] = 0;
			}
		},

		/**
		 *
		 * @param {String|Number} name
		 * @returns {boolean}
		 */
		checkComplete: function(name) {
			if (this.received[name] !== this.counts[name]) return false;

			var count = this.counts[name],
				parts = this.parts[name];

			if (count === undefined) return false;

			this.callbacks[name].apply(this, parts);

			return true;
		},

		/**
		 *
		 * @param {Array} parentArray
		 * @param {Array} array1
		 * @param {Array} [array2]
		 * @param {Array} [array3]
		 * @param {Array} [array4]
		 * @param {Array} [array5]
		 * @param {Array} [array6]
		 * @param {Array} [array7]
		 * @param {Array} [array8]
		 * @param {Array} [array9]
		 * @param {Array} [array10]
		 */
		concat: function(parentArray) {
			var i,
				a = 1, //skip first
				maxArgs = arguments.length,
				array,
				max;

			for(;a < maxArgs;a++) {
				array = arguments[a];
				max = array.length;
				for (i = 0; i < max; i++) {
					parentArray.push(array[i]);
				}
			}

			return this;
		}
	};

	return jsonite;
})();