define(function () {
        "use strict";

        return {
            APP_ID: chrome.i18n.getMessage("@@extension_id"),
            APP_VERSION: chrome.runtime.getManifest().version,

            // Application window
            MIN_WIN_WIDTH: 1100,
            DEFAULT_WIN_WIDTH: 1100,
            MIN_WIN_HEIGHT: 700,
            DEFAULT_WIN_HEIGHT: 700,
            APP_WINDOW: "main.html",

            // Chrome storage keys
            STORAGE_KEY_SETTINGS: "applicationSettings"
        };
    }
);
