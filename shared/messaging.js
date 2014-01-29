define(function (require) {
    "use strict";

    var definitions = require("shared/definitions");
    var actionType = {
        DEVICES: "sonos.devices.data",
        REQUEST_DEVICES: "sonos.devices.request",
        REQUEST_MEDIA_INFO: "sonos.mediaInfo.request",
        MEDIA_INFO: "sonos.mediaInfo.data"
    };


    /**
     * Wrapper for chrome messaging.
     * This more or less just as chrome messaging. The wrapping will verify that it is a known action and sender.
     *
     * The callback method takes one or two arguments. It can either just be a payload (an object) or a function to
     * be called with a single object argument. Or both.
     *
     * @param {string} action       Name of the action to perform
     * @param {function} [callback] A callback function
     */
    function addListenerFor(action, callback) {
        chrome.runtime.onMessage.addListener(
            function onMessage(message, sender, sendResponse) {
                if (!sender || (sender.id !== definitions.app.chromeId)) {
                    console.debug("Not interested in messages from app id '%s'", sender);
                    return;
                }

                if (!message.action) {
                    console.warn("Message did not contain an action!");
                    return;
                }

                if (message.action === action) {
                    if (message.payload === null || message.payload === undefined) {
                        callback(sendResponse);
                    }
                    else {
                        callback(message.payload, sendResponse);
                    }
                }
            }
        );
    }

    /**
     * Wrapper for chrome messaging.
     * This more or less just as chrome messaging. The wrapping will require an action to be specified in order for
     * the message to be recognized and dispatched properly.
     *
     * The callback method should follow the specifications for the responseCallback function argument in chrome dev docs
     * http://developer.chrome.com/extensions/runtime.html#method-sendMessage
     *
     * @param {string} action As defined in this module
     * @param {any} [payload] Payload
     * @param {function} [callback] Callback that takes 1 argument: payload
     */
    function sendMessage(action, payload, callback) {
        var message = {action: action};
        var onSuccessCallback;

        console.debug("Sending message '%s'", action);

        if (typeof(payload) === "function") {
            // Message has no payload, only callback
            onSuccessCallback = payload;
        }
        else {
            message.payload = payload;
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
