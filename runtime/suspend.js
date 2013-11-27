define(["shared"],
    function (shared) {
        "use strict";
        var onSuspend = function () {
            shared.util.debugLog("chrome.runtime.onSuspend");
        };
        chrome.runtime.onSuspend.addListener(onSuspend);
    }
);
