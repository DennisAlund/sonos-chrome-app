define(function (require) {
        "use strict";

        var shared = require("shared");

        var onSuspend = function () {
            shared.util.debugLog("chrome.runtime.onSuspend");
        };
        chrome.runtime.onSuspend.addListener(onSuspend);
    }
);
