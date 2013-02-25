//  Underscore.silent
//  (c) 2011-2012 Claudio Beatrice <claudi0 d0t beatric3 at gmail d0t c0m>.
//  Underscore.silent is freely distributable under the terms of the MIT license.
//  Documentation: https://github.com/omissis/underscore.silent
//  Version '0.1.3'

(function (_) {
  "use strict";

  _.mixin({
    /**
     * Create a hierarchy of nested objects to simulate a namespace.
     *
     * Beside helping to avoid to pollute the global namespace, this function also ensure the
     * wanted tree of objects exists, otherwise it creates it.
     *
     * @var string namespace
     *   a string describing the namespace, such as: Foo.Bar.Baz
     */
    ns : function (namespace) {
      var win = window;

      namespace = namespace.split('.');

      for (var i = 0, len = namespace.length; i < len; ++i) {
        if (undefined === win[namespace[i]]) {
          win[namespace[i]] = {};
        }
        win = win[namespace[i]];
      }
    },

    /**
     * Replace tokens in a string with the corresponding values in the given map.
     *
     * Tokens in the string must be in the %{token} form.
     *
     * @var string str
     *   a string with the values to be replaced
     * @var string map
     *   an object containing the values to replace in the string,
     *   keyed as the tokens in the string
     *
     * @return string
     */
    replace : function (str, map) {
      return str.replace(/\%\{(\w+)\}/g, function(match, key) {
        return map[key];
      });
    },

    /**
     * Calculate the percentage of an amount on a total
     *
     * @var Number amount
     * @var Number total
     * @var Number scale
     * @var Number decimalDigits
     *
     * @return Number
     */
    percent : function (amount, total, scale, decimalDigits) {
      if (total === 0) {
        return 0;
      }

      amount = amount || 0;
      scale = scale || 1;
      decimalDigits = decimalDigits || 0;

      var precisionMult = Math.pow(10, decimalDigits);

      return Math.round(precisionMult * scale * (amount / total)) / precisionMult;
    },

    /**
     * Rounds a number to the needed digit
     *
     * @var Number number
     * @var Number digits
     *
     * @return Number
     */
    round : function (number, digits) {
      var multiple = Math.pow(10, digits);

      return Math.round(number * multiple) / multiple;
    },

    /**
     * transform a number from rgb to hex
     *
     * @var String rgb
     */
    rgbToHex : function(rgb) {
      if (!rgb) {
        return '#ffffff'; //default color
      }

      var hex_rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

      function hex(x) {
        return ("0" + parseInt(x, 10).toString(16)).slice(-2);
      }

      return hex_rgb ? ("#" + hex(hex_rgb[1]) + hex(hex_rgb[2]) + hex(hex_rgb[3])) : rgb;
    },

    /**
     * Returns true if the value of object is Null or Undefined.
     *
     * @var string value
     *
     * @return boolean
     */
    isVoid : function (value) {
      return _.isNull(value) || _.isUndefined(value);
    },

    /**
     * Returns an URL given the path
     *
     * @var string path the relative path
     *
     * @return string the absolute path
     */
    url : function (path) {
      return location.protocol + '//' + location.host + "/" + path.replace(/\/{1,}$/, '');
    }
  });
}(_));
