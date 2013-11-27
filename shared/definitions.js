define([],
    function () {
        "use strict";
        return {
            APP_ID: chrome.i18n.getMessage("@@extension_id"),
            APP_VERSION: chrome.runtime.getManifest().version,

            // Application window
            MIN_WIN_WIDTH: 800,
            DEFAULT_WIN_WIDTH: 800,
            MIN_WIN_HEIGHT: 600,
            DEFAULT_WIN_HEIGHT: 600,
            APP_PATH: "/angular_app/",
            APP_WINDOW: "main.html",

            // Chrome storage keys
            STORAGE_KEY_SETTINGS: "applicationSettings"
        };
    }
);
