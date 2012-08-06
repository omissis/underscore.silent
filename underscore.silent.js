//  Underscore.silent
//  (c) 2011-2012 Claudio Beatrice <claudi0 d0t beatric3 at gmail d0t c0m>.
//  Underscore.silent is freely distributable under the terms of the MIT license.
//  Documentation: https://github.com/omissis/underscore.silent
//  Version '0.1.0'

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
   * Look for a value in an object.
   *
   * Inspired by php's in_array() funciton.
   *
   * @var object haystack
   *   the object to be searched into
   * @var object needle
   *   the value to be searched
   */
  in_object : function (haystack, needle) {
    for (key in haystack) {
      if (needle === haystack[key]) {
        return true;
      }
    }
    return false;
  }
});