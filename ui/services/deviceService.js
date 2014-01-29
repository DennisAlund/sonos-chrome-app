define(function (require) {
        "use strict";

        var app = require("ui/app");
        var serviceBase = require("./base");
        var messaging = require("shared/messaging");


        /**
         *
         * TODO:
         * Stop the flickering
         *   - Make sure that there is actually a difference in the new data
         *   - Maybe implement a lazy update that waits for a second of quietness before updating
         *
         *
         * Clicking a room in the list
         *  - Emit the change of room through the system and update a playerStateService
         *    http://docs.angularjs.org/guide/scope
         *
         * */

        /**
         * The deviceService implements methods for retrieving list of devices and getting or setting state of them
         *
         * @returns {object} Device Factory
         */
        function deviceService() {
            var that = serviceBase();

            var devices = [];
            var mediaGroups = [];

            that.getDevices = function () {
                return devices.slice();
            };

            that.getMediaGroups = function () {
                return mediaGroups.slice();
            };

            /**
             * Get a representative device for a specified media group
             *
             * @param {object}  mediaGroup  Media group object
             * @returns {object} A device
             */
            that.getDeviceForMediaGroup = function (mediaGroup) {
                var devicesInGroup = devices.filter(function (device) {
                    return device.room.name === mediaGroup.name;
                });

                return devicesInGroup.length > 0 ? devicesInGroup[0] : null;
            };

            function onDevices(deviceData) {
                console.debug("Got device info.", deviceData);
                deviceData = deviceData || [];
                devices = deviceData.slice();

                var mediaGroupMap = {};
                mediaGroups = [];
                deviceData.forEach(function (device) {
                    // Create a unique list of media groups (aka rooms)
                    if (!mediaGroupMap.hasOwnProperty(device.room.name) && device.speakerSize > 0) {
                        mediaGroups.push(device.room);
                        mediaGroupMap[device.room.name] = true;
                    }
                });

                that.refresh();
            }

            /**
             * Initiate the service
             */
            (function init() {
                console.debug("Initiating deviceService");
                messaging.addListenerFor(messaging.action.DEVICES, onDevices);
                // The device service might be loaded and initialized *after* device broadcast
                messaging.sendMessage(messaging.action.REQUEST_DEVICES, onDevices);
            }());

            return that;
        }

        deviceService.getId = function () {
            return "deviceService";
        };

        app.factory(deviceService.getId(), deviceService);

        return deviceService;
    }
);
