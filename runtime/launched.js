define(function(require) {
        "use strict";

        var shared = require("shared");

        function onLaunched () {
            shared.util.debugLog("chrome.app.runtime.onLaunched");

            chrome.app.window.create(shared.definitions.APP_PATH + shared.definitions.APP_WINDOW, {
                singleton: true,
                id: "app-main-window",
                bounds: {
                    width: shared.definitions.DEFAULT_WIN_WIDTH,
                    height: shared.definitions.DEFAULT_WIN_HEIGHT
                },
                minWidth: shared.definitions.MIN_WIN_WIDTH,
                minHeight: shared.definitions.MIN_WIN_HEIGHT
            });
        };

        chrome.app.runtime.onLaunched.addListener(onLaunched);
    }
);
