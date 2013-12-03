define(function () {
        "use strict";

        /**
         * Base factory class
         *
         * @returns {object}
         */
        function factory() {
            var that = {};
            var callbacks = [];

            that.onUpdate = function (callback) {
                callbacks.push(callback);
            };

            /**
             * Applies changes to the data source into the registered callbacks
             */
            that.refresh = function () {
                callbacks.forEach(function (callback) {
                    callback();
                });
            };

            return that;
        }

        return factory;
    }
);
