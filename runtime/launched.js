define(function (require) {
        "use strict";

        var shared = require("shared");

        function onLaunched() {
            shared.util.debugLog("chrome.app.runtime.onLaunched");

            chrome.app.window.create("/ui/" + shared.definitions.APP_WINDOW, {
                singleton: true,
                id: "app-main-window",
                bounds: {
                    width: shared.definitions.DEFAULT_WIN_WIDTH,
                    height: shared.definitions.DEFAULT_WIN_HEIGHT
                },
                minWidth: shared.definitions.MIN_WIN_WIDTH,
                minHeight: shared.definitions.MIN_WIN_HEIGHT
            });
            chrome.storage.local.set({devices: []});
            setTimeout(function () {
                console.log("Now writing to local storage.");
                chrome.storage.local.set({devices: [
                    {room: "test"}
                ]});
            }, 5000);
        }

        chrome.app.runtime.onLaunched.addListener(onLaunched);
    }
);
