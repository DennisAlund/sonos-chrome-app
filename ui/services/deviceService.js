define(function (require) {
        "use strict";

        var app = require("ui/app");
        var serviceBase = require("./base");
        var messaging = require("shared/messaging");


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
                return devices;
            };

            that.getMediaGroups = function () {
                return mediaGroups;
            };

            that.getDeviceForMediaGroup = function (mediaGroup) {
                var activeDevice = null;
                devices.forEach(function (device) {
                    if (device.room.name === mediaGroup) {
                        activeDevice = device;
                    }
                });
                return activeDevice;
            };

            function onDevices(deviceData) {

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
                console.debug("Got device info.", deviceData);
                devices.splice(0, devices.length);
                for (var deviceId in deviceData) {
                    if (deviceData.hasOwnProperty(deviceId)) {
                        devices.push(deviceData[deviceId]);
                    }
                }

                mediaGroups.splice(0, mediaGroups.length);
                var roomMap = {};
                devices.forEach(function (device) {
                    if (!roomMap.hasOwnProperty(device.room.name) && device.speakerSize > 0) {
                        mediaGroups.push(device.room);
                        roomMap[device.room.name] = true;
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
