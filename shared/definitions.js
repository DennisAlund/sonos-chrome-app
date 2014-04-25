define(function () {
        "use strict";

        return {
            app: {
                chromeId: chrome.i18n.getMessage("@@extension_id"),
                version: chrome.runtime.getManifest().version
            },

            window: {
                id: "app-main-window",
                url: "/ui/player_ui.html",
                size: {
                    minWidth: 1100,
                    minHeight: 700,
                    defaultWidth: 1100,
                    defaultHeight: 700
                }
            },

            storage: {
                deviceLocations: "knownDeviceLocations"
            }
        };
    }
);
