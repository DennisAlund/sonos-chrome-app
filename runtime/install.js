define(["shared"],
    function (shared) {
        "use strict";
        var onInstall = function (details) {
            if (details.reason !== "install") {
                return;
            }

            shared.util.debugLog("chrome.runtime.onInstalled", details);
        };
        chrome.runtime.onInstalled.addListener(onInstall);
    }
);
