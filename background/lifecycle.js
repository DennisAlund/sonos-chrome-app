define(function (require) {
        "use strict";

        var definitions = require("shared/definitions");
        var sonos = require("sonos");

        var appOpts = {
            singleton: true,
            id: definitions.window.id,
            bounds: {
                width: definitions.window.size.defaultWidth,
                height: definitions.window.size.defaultHeight
            },
            minWidth: definitions.window.size.minWidth,
            minHeight: definitions.window.size.minHeight
        };

        /**
         * Callback method that is triggered when the application window is closed.
         * This is a good time for shutting down any subscription or listener that only concerns the UI.
         *
         * @param createdWindow
         */
        function onWindowClosed() {
            console.debug("App window closed.");
            sonos.service.stop();

            // Store all known devices before closing the window. This can speed up the discovery
            // if the application is completely restarted.
            var storageData = {};
            storageData[definitions.storage.deviceLocations] = [];
            var devices = sonos.service.getDevices();
            devices.forEach(function (device) {
                var url = device.getInfoUrl();
                storageData[definitions.storage.deviceLocations].push(url);
            });

            console.debug("Storing known devices.", storageData);
            chrome.storage.local.set(storageData);
        }

        /**
         * Callback method that is triggered when the application window is created.
         * This is a good time for setting up some initialisation that only concerns the UI.
         *
         * @param createdWindow
         */
        function onWindowCreated(createdWindow) {
            console.debug("App window opened.");
            createdWindow.onClosed.addListener(onWindowClosed);

            // Fetch a list of previously known devices from the cache and try to find them again
            chrome.storage.local.get(definitions.storage.deviceLocations, function (storageData) {
                console.debug("Loading known devices.", storageData);
                var deviceLocations = storageData[definitions.storage.deviceLocations] || [];
                deviceLocations.forEach(function (location) {
                    sonos.service.requestDeviceDetails(location);
                });
            });

            sonos.service.start();
        }

        /**
         * Callback method for when the application is started. I.e. when the application window is
         * about to be opened.
         */
        function onLaunched() {
            console.debug("chrome.app.runtime.onLaunched");
            chrome.app.window.create(definitions.window.url, appOpts, onWindowCreated);
        }

        /**
         * Initialize the application life cycle listeners etc
         */
        (function init() {
            chrome.app.runtime.onLaunched.addListener(onLaunched);
        }());
    }
);
