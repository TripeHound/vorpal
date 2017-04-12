'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Option = function () {

  /**
   * Initialize a new `Option` instance.
   *
   * @param {String} flags
   * @param {String} description
   * @param {Autocomplete} autocomplete
   * @return {Option}
   * @api public
   */

  function Option(flags, description) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, Option);

    options = (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' ? options : {
      autocomplete: options
    };

    this.autocomplete = options.autocomplete;
    this._default = options.default ? options.default : null;
    this.flags = flags;
    this.required = ~flags.indexOf('<');
    this.optional = ~flags.indexOf('[');
    this.bool = !~flags.indexOf('-no-');
    this.autocomplete = autocomplete;
    flags = flags.split(/[ ,|]+/);
    if (flags.length > 1 && !/^[[<]/.test(flags[1])) {
      this.assignFlag(flags.shift());
    }
    this.assignFlag(flags.shift());
    this.description = description || '';
  }

  /**
   * Return option name.
   *
   * @return {String}
   * @api private
   */

  _createClass(Option, [{
    key: 'name',
    value: function name() {
      if (this.long !== undefined) {
        return this.long.replace('--', '').replace('no-', '');
      }
      return this.short.replace('-', '');
    }

    /**
     * Check if `arg` matches the short or long flag.
     *
     * @param {String} arg
     * @return {Boolean}
     * @api private
     */

  }, {
    key: 'is',
    value: function is(arg) {
      return arg === this.short || arg === this.long;
    }

    /**
     * Assigned flag to either long or short.
     *
     * @param {String} flag
     * @api private
     */

  }, {
    key: 'assignFlag',
    value: function assignFlag(flag) {
      if (flag.startsWith('--')) {
        this.long = flag;
      } else {
        this.short = flag;
      }
    }
  }, {
    key: 'default',
    value: function _default() {
      return this._default;
    }
  }]);

  return Option;
}();

/**
 * Expose `Option`.
 */

module.exports = exports = Option;
