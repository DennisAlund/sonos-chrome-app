define(function () {
        "use strict";

        var onInstall = function (details) {
            if (details.reason !== "install") {
                return;
            }

            console.debug("chrome.runtime.onInstalled", details);
        };
        chrome.runtime.onInstalled.addListener(onInstall);
    }
);
