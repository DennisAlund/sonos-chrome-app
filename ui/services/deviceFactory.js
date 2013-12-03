define(function (require) {
    "use strict";

    var app = require("ui/app");
    var definitions = require("shared/definitions");
    var factory = require("./factory");

    /**
     * N.B.
     * Never re-assign the devices array to a new instance. Assume that the controllers are using a reference.
     *
     * @returns {object} Device factory
     */
    function deviceFactory() {
        var devices = [];
        var that = factory();

        function populate(deviceList) {
            devices.splice();
            if (deviceList) {
                deviceList.forEach(function (device) {
                    devices.push(device);
                });
            }
            that.refresh();
        }

        chrome.storage.onChanged.addListener(function (changes, areaName) {
            if (areaName === "local" && changes.hasOwnProperty(definitions.storage.devices)) {
                populate(changes[definitions.storage.devices].newValue);
            }
        });

        that.getDevices = function () {
            if (devices.length === 0) {
                chrome.storage.local.get(definitions.storage.devices, function (items) {
                    populate(items[definitions.storage.devices]);
                });
            }
            return devices;
        };

        return that;
    }


    app.factory("deviceFactory", deviceFactory);
});
