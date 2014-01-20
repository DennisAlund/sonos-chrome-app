define(function () {
        "use strict";

        /**
         * Base factory class
         *
         * @returns {object}
         */
        function service() {
            var that = {};
            var scopes = [];
            var callbacks = [];

            that.subscribeToUpdate = function (scope) {
                if (scope && scope.$apply) {
                    scopes.push(scope);
                }
            };

            that.onUpdate = function (callback) {
                callbacks.push(callback);
            };

            /**
             * Applies changes to the data source into the registered scopes
             */
            that.refresh2 = function () {
                scopes.forEach(function (scope) {
                    scope.$apply();
                });
            };
            that.refresh = function () {
                callbacks.forEach(function (callback) {
                    callback();
                });
            };

            return that;
        }

        return service;
    }
);
