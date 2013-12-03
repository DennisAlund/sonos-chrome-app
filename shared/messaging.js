define(function (require) {
    "use strict";


    var actionType = {
        STORAGE: "chrome.storage.sync",
        STORAGE_GET: "chrome.storage.sync.get",
        STORAGE_SET: "chrome.storage.sync.set",
        DEVICES_GET: "sonos.devices.get"
    };

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

        if (typeof(payload) === "object") {
            message.payload = payload;
        }
        else if (typeof(payload) === "function") {
            onSuccessCallback = payload;
        }

        chrome.runtime.sendMessage(message, onSuccessCallback || callback);
    }

    return {
        actionType: actionType,
        send: sendMessage
    };
});
