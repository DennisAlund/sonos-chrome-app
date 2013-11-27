define([], function () {
        /**
         * Message definitions for messages that are passed with Chrome Messaging system
         * http://developer.chrome.com/extensions/runtime.html#event-onMessage
         * http://developer.chrome.com/extensions/runtime.html#method-sendMessage
         */
        var message = function (options) {
            options = options || {};
            var that = {};

            var action = options.action || message.actionType.UNKNOWN;

            that.getAction = function () {
                return action;
            };

            that.setAction = function (newAction) {
                action = newAction;
            };

            that.isActionType = function (actionType) {
                return actionType && action.indexOf(actionType) >= 0;
            };

            return that;
        };

        // Default action types, can be extended by other modules
        message.actionType = {
            UNKNOWN: "__UNKNOWN__",
            STORAGE: "chrome.storage.sync",
            STORAGE_GET: "chrome.storage.sync.get",
            STORAGE_SET: "chrome.storage.sync.set"
        };

        return message;
    }
);
