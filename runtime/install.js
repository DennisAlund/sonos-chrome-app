define(function (require) {
        "use strict";

        var shared = require("shared");

        var onInstall = function (details) {
            if (details.reason !== "install") {
                return;
            }

            shared.util.debugLog("chrome.runtime.onInstalled", details);
        };
        chrome.runtime.onInstalled.addListener(onInstall);
    }
);
