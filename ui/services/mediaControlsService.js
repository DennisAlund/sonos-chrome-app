define(function (require) {
        "use strict";

        var app = require("ui/app");
        var serviceBase = require("./base");
        var messaging = require("shared/messaging");

        var playerStateType = {
            play: "playThatFunkyMusic",
            pause: "pause"
        };

        var seekOperationType = {
            skipForward: "skipForward",
            skipBackward: "skipBackward",
            seekTime: "seekTime"
        };

        /**
         * The mediaControlsService implements methods for retrieving information on what is currently being played
         * on a device
         *
         * @returns {object} Device Factory
         */
        function mediaControlsService() {
            var that = serviceBase();

            that.playerState = playerStateType;
            that.seekOperation = seekOperationType;

            /**
             * Asynchronous call for mediaInfo for a specific device
             *
             * @param {object}    device
             */
            that.setVolume = function (device, volume) {
                if (!(device && device.id)) {
                    console.warn("Can not set volume '%s' for invalid or null device", volume);
                    return;
                }
                messaging.sendMessage(messaging.action.CONTROL_VOLUME_SET, {id: device.id, volume: volume});
            };

            that.setState = function (device, state) {
                if (!(device && device.id)) {
                    console.warn("Can not set state '%s' for invalid or null device", state);
                    return;
                }

                switch (state) {
                case playerStateType.play:
                    messaging.sendMessage(messaging.action.CONTROL_PLAY, device.id);
                    break;

                case playerStateType.pause:
                    messaging.sendMessage(messaging.action.CONTROL_PAUSE, device.id);
                    break;

                default:
                    console.error("Unknown player state '%s'", state);
                }
            };

            that.seek = function (device, seekOperation, time) {
                if (!(device && device.id)) {
                    console.warn("Can not set perform seek operation '%s' for invalid or null device", seekOperation);
                    return;
                }

                switch (seekOperation) {
                case seekOperationType.skipForward:
                    messaging.sendMessage(messaging.action.CONTROL_SEEK_FWD, device.id);
                    break;

                case seekOperationType.skipBackward:
                    messaging.sendMessage(messaging.action.CONTROL_SEEK_BWD, device.id);
                    break;

                case seekOperationType.seekTime:
                    time = time || 0;
                    messaging.sendMessage(messaging.action.CONTROL_SEEK_TIME, {id: device.id, time: time});
                    break;

                default:
                    console.error("Unknown seek operation'%s'", seekOperation);
                }
            };

            function onMediaInfo(mediaControlData) {
                console.debug("Got media control data.", mediaControlData);
                that.refresh();
            }

            /**
             * Initiate the service
             */
            (function init() {
                console.debug("Initiating mediaControlsService");
                messaging.addListenerFor(messaging.action.CONTROL_VOLUME_INFO, onMediaInfo);
            }());

            return that;
        }

        mediaControlsService.getId = function () {
            return "mediaControlsService";
        };

        app.factory(mediaControlsService.getId(), [mediaControlsService]);

        return mediaControlsService;
    }
);
