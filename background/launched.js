define(function (require) {
        "use strict";

        var definitions = require("shared/definitions");
        var sonos = require("sonos");

        var appOpts = {
            singleton: true,
            id: definitions.window.id,
            bounds: {
                width: definitions.window.size.defaultWidth,
                height: definitions.window.size.defaultHeight
            },
            minWidth: definitions.window.size.minWidth,
            minHeight: definitions.window.size.minHeight
        };

        function onWindowClosed() {
            console.debug("App window closed.");
            sonos.service.stop();
        }

        function onWindowCreated(createdWindow) {
            console.debug("App window opened.");
            createdWindow.onClosed.addListener(onWindowClosed);
            sonos.service.start();
        }

        function onLaunched() {
            chrome.app.window.create(definitions.window.url, appOpts, onWindowCreated);
        }

        chrome.app.runtime.onLaunched.addListener(onLaunched);
    }
);
