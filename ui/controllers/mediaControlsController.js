define(function (require) {
        "use strict";

        var app = require("ui/app");
        var services = require("ui/services");
        var signals = require("ui/shared/signals");

        /**
         * Manage all the media controls, such as play, pause, etc.
         *
         * @param $rootScope
         * @param $scope
         * @param deviceService
         */
        function mediaControlsController($rootScope, $scope, deviceService, mediaControlsService) {

            $scope.mediaGroup = null;
            $scope.volume = 0;
            $scope.play = false;

            $scope.skipForward = function onSkipForward() {
                var device = deviceService.getDeviceForMediaGroup($scope.mediaGroup);
                console.debug("Skipping music forward in '%s'", $scope.mediaGroup.name);

                mediaControlsService.seek(device, mediaControlsService.seekOperation.skipForward);
            };


            $scope.skipBackward = function onSkipBackward() {
                var device = deviceService.getDeviceForMediaGroup($scope.mediaGroup);
                console.debug("Skipping music backward in '%s'", $scope.mediaGroup.name);

                mediaControlsService.seek(device, mediaControlsService.seekOperation.skipBackward);
            };

            // ---------------------------------------------------------------------------------------------------------
            // ---------------------------------------------------------------------------------------------------------
            // PRIVATE

            function onVolumeChange(newVolume, oldVolume) {
                if (newVolume !== oldVolume) {
                    var device = deviceService.getDeviceForMediaGroup($scope.mediaGroup);
                    console.debug("Set volume to '%s' for '%s'", newVolume, $scope.mediaGroup.name);
                    mediaControlsService.setVolume(device, newVolume);
                }
            }

            function onPlayStateChange(newState, oldState) {
                if (newState !== oldState) {
                    var device = deviceService.getDeviceForMediaGroup($scope.mediaGroup);
                    var playerState = newState ? mediaControlsService.playerState.play : mediaControlsService.playerState.pause;
                    console.debug("Set player state to '%s' for '%s'", playerState, $scope.mediaGroup.name);
                    mediaControlsService.setState(device, playerState);
                }
            }



            // ---------------------------------------------------------------------------------------------------------
            // ---------------------------------------------------------------------------------------------------------
            // INIT

            (function init() {
                console.debug("Initiating mediaControlsController");
                $rootScope.$on(signals.mediaGroupSelected, function (event, mediaGroup) {
                    $scope.mediaGroup = mediaGroup;
                });
                $scope.$watch("volume", onVolumeChange);
                $scope.$watch("play", onPlayStateChange);
            }());

        }

        mediaControlsController.getId = function () {
            return "mediaControlsController";
        };

        var args = ["$rootScope", "$scope", services.deviceServiceId, services.mediaControlsService, mediaControlsController];
        app.controller(mediaControlsController.getId(), args);
    }
);
