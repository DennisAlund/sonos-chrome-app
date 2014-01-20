define(function (require) {
        "use strict";

        var shared = require("shared");

        var onUpdate = function (details) {
            if (details.reason !== "update") {
                return;
            }

            if (shared.util.isEqualVersion(shared.definitions.APP_VERSION, details.previousVersion)) {
                return;
            }

            shared.util.appLog("Upgrading from v" + details.previousVersion + " to v" + shared.definitions.APP_VERSION);

            if (shared.util.shouldApplyUpdate("0.1", details.previousVersion)) {
                shared.util.appLog("Applying changes introduced in v0.1.x");
            }
        };
        chrome.runtime.onInstalled.addListener(onUpdate);
    }
);
