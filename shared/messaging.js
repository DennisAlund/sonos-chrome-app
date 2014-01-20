define(function (require) {
    "use strict";

    var definitions = require("shared/definitions");
    var actionType = {
        DEVICES: "sonos.devices"
    };


    function addListenerFor(action, callback) {

        var onMessage = function onMessage(message, sender) {
            if (!sender || (sender.id !== definitions.app.chromeId)) {
                console.debug("Not interested in messages from app id '%s'", sender);
                return;
            }

            if (!message.action) {
                console.warn("Message did not contain an action!");
                return;
            }

            if (message.action === action) {
                callback(message.payload);
            }
        };

        chrome.runtime.onMessage.addListener(onMessage);
    }

    /**
     * Wrapper for chrome messaging.
     *
     * @param {string} action As defined in this module
     * @param {any} [payload] Payload
     * @param {function} [callback] Callback
     */
    function sendMessage(action, payload, callback) {
        var message = {action: action};
        var onSuccessCallback;

        console.debug("Sending message '%s'", action);

        if (typeof(payload) === "object") {
            message.payload = payload;
        }
        else if (typeof(payload) === "function") {
            // Message has no payload, only callback
            onSuccessCallback = payload;
        }
        else {
            onSuccessCallback = callback;
        }

        chrome.runtime.sendMessage(message, onSuccessCallback || function () {});
    }

    return {
        action: actionType,
        sendMessage: sendMessage,
        addListenerFor: addListenerFor
    };
});
