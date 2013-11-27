define([],
    function () {
        return function (options) {
            options = options || {};
            var that = {};

            that.someValue = options.someValue || 'default';

            return that;
        };
    }
);
