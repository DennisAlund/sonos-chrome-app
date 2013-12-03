define(function (require) {
        "use strict";

        var shared = require("shared");

        function onMessage(message, sender, callback) {
            if (!sender || (sender.id !== shared.definitions.APP_ID)) {
                console.debug("Not interested in messages from app id '%s'", sender);
                return;
            }

            if (!message.action) {
                console.warn("Message did not contain an action!");
                return;
            }

            console.debug("Dispatching message %s", message.action);
            if (message.action === shared.messaging.actionType.DEVICES_GET) {
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
