//    Underscore.silent
//    (c) 2011-2014 Claudio Beatrice <claudi0 d0t beatric3 at gmail d0t c0m>.
//    Underscore.silent is freely distributable under the terms of the MIT license.
//    Documentation: https://github.com/omissis/underscore.silent
//    Version '0.2.0'

(function (_) {
    "use strict";

    _.mixin({
        /**
         * Get the global object in the current execution context
         *
         * It could be window in a browser or global when running node.js.
         *
         * @return Object|Null
         */
        getGlobalObject : function () {
            return (function () {
                return this || (1,eval)('this');
            }());
        },

        /**
         * Create a hierarchy of nested objects to simulate a namespace.
         *
         * Beside helping to avoid to pollute the global namespace, this function also ensure the
         * wanted tree of objects exists, otherwise it creates it.
         *
         * @var String namespace
         *     a string describing the namespace, such as: Foo.Bar.Baz
         */
        ns : function (namespace) {
            var GLOBAL = _.getGlobalObject();

            namespace = namespace.split('.');

            for (var i = 0, len = namespace.length; i < len; i += 1) {
                if (_.isUndefined(GLOBAL[namespace[i]])) {
                    GLOBAL[namespace[i]] = {};
                }
                GLOBAL = GLOBAL[namespace[i]];
            }
        },

        /**
         * Invokes the given callback passing the specified dependencies.
         *
         * @var String|Array moduleNames
         * @var Function callback
         *
         * @return Object|Null
         */
        require : function (moduleNames, callback) {
            var modules = [];
            var GLOBAL = _.getGlobalObject();
            var getModule = function (module) {
                if (_.isUndefined(GLOBAL[module])) {
                    throw module.toString() + " object does not exist.";
                }

                return GLOBAL[module];
            };

            if (_.isArray(moduleNames)) {
                for (var i = 0, len = moduleNames.length; i < len; i += 1) {
                    modules.push(getModule(moduleNames[i]));
                }
            }

            if (_.isString(moduleNames)) {
                modules.push(getModule(moduleNames));
            }

            return callback.apply(GLOBAL, modules);
        },

        /**
         * Calculate sum of an array.
         *
         * @var Array obj
         *     array of which you want to calculate the sum
         * @var Function iterator
         *     generates the criterion by which the value is ranked.
         *
         * @return Number
         */
        sum : function (obj, iterator) {
            if (!iterator && _.isEmpty(obj)) {
                return -Infinity;
            }

            var total = 0;

            for (var i = 0, len = obj.length; i < len; i += 1) {
                total += iterator ? iterator(obj[i]) : obj[i];
            }

            return total;
        },

        /**
         * Replace tokens in a string with the corresponding values in the given map.
         *
         * Tokens in the string must be in the %{token} form.
         *
         * @var String str
         *     a string with the values to be replaced
         * @var String map
         *     an object containing the values to replace in the string,
         *     keyed as the tokens in the string
         *
         * @return String
         */
        replace : function (str, map) {
            return str.replace(/\%\{(\w+)\}/g, function(match, key) {
                return map[key];
            });
        },

        /**
         * Calculate the percentage of an amount on a total.
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
         * Rounds a number to the needed digit.
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
         * Transform a number from rgb to hex.
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
         * @var String value
         *
         * @return Boolean
         */
        isVoid : function (value) {
            return _.isNull(value) || _.isUndefined(value);
        },

        /**
         * Returns an URL given the path
         *
         * @var String path the relative path
         *
         * @return String the absolute path
         */
        url : function (path) {
            var GLOBAL = _.getGlobalObject();

            return GLOBAL.location.protocol + '://' + GLOBAL.location.host + "/" + path.replace(/\/{1,}$/, '');
        }
    });
}(_));
