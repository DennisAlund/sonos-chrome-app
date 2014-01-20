define(function (require) {
        "use strict";

        var definitions = require("shared/definitions");
        var messaging = require("shared/messaging");

        function onMessage(message, sender, callback) {
            if (!sender || (sender.id !== definitions.app.chromeId)) {
                console.debug("Not interested in messages from app id '%s'", sender);
                return;
            }

            if (!message.action) {
                console.warn("Message did not contain an action!");
                return;
            }

            console.debug("Dispatching message %s", message.action);
            if (message.action === messaging.actionType.DEVICES_GET) {
                callback([
                    {getRoom: function () {return "Kitchen"; }},
                    {getRoom: function () {return "Living room"; }}
                ]);
            }

            else {
                console.warn("Message action '%s' is not supported.", message.action);
            }
        }

        chrome.runtime.onMessage.addListener(onMessage);
    }
);
