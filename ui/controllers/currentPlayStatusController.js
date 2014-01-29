define(function (require) {
        "use strict";

        var app = require("ui/app");
        var services = require("ui/services");
        var signals = require("ui/shared/signals");

        function metaData() {
            var that = {};

            that.descriptions = [];

            that.setDescription = function (header, description) {
                that.descriptions.push({
                    header: header,
                    description: description
                });
            };

            that.reset = function () {
                that.descriptions.splice(0, that.descriptions.length);
            };

            (function init() {
                that.reset();
            }());

            return that;
        }

        function currentPlayStatusController($rootScope, $scope, deviceService, mediaInfoService) {

            $scope.metaData = metaData();

            /**
             * Set the current media group in a scope. The scope parameter is passed in order for $apply methods to pass
             * their scope parameter.
             *
             * The function will abort directly if the current media group is already set.
             *
             * @param {object}  scope       The current local scope
             * @param {object}  mediaGroup  The media group object
             */
            function setMediaGroup(scope, mediaGroup) {
                mediaGroup = mediaGroup || {};
                if (scope.mediaGroup && scope.mediaGroup.name === mediaGroup.name) {
                    return;
                }

                scope.metaData.reset();
                scope.mediaGroup = mediaGroup;
                scope.activeDevice = deviceService.getDeviceForMediaGroup(mediaGroup);

                if (!scope.activeDevice) {
                    console.warn("No device found for media group: %s", mediaGroup.name);
                    return;
                }

                console.debug("Setting active media group '%s' for device '%s'", mediaGroup.name, scope.activeDevice.id);

                show("loading");
                mediaInfoService.setActiveDevice(scope.activeDevice);
            }


            /**
             * Manage the state of the view area so that it properly hides information, shows loading state, etc
             *
             * @param {string} state    The current state of the controller
             */
            function show(state) {
                if (state === "empty") {
                    $scope.metaData.reset();
                }
            }


            /**
             * Callback function that will trigger when mediaInfoService has received new media info state.
             */
            function onMediaInfoUpdate() {
                var mediaInfo = mediaInfoService.getMediaInfo();
                $scope.$apply(function (scope) {
                    if (mediaInfo.mediaType === "MEDIA_TYPE_MUSIC_FILE") {
                        scope.metaData.setDescription(chrome.i18n.getMessage("musicTrack"), mediaInfo.metaData.title);
                        scope.metaData.setDescription(chrome.i18n.getMessage("musicArtist"), mediaInfo.metaData.artist);
                        scope.metaData.setDescription(chrome.i18n.getMessage("musicAlbum"), mediaInfo.metaData.album);
                    }

                    show("ready");
                });
            }

            /**
             * Callback function that will trigger when deviceService has received new device information.
             */
            function onDevicesUpdate() {
                var mediaGroups = deviceService.getMediaGroups();
                var haveMediaGroup = $scope.mediaGroup ? true : false;
                var isGroupStillPresent = haveMediaGroup && mediaGroups.some(function (mediaGroup) {
                    return mediaGroup.name === $scope.mediaGroup.name;
                });

                if (!isGroupStillPresent) {
                    $scope.$apply(function (scope) {
                        setMediaGroup(scope, mediaGroups[0]);
                    });
                }
            }


            /**
             * Initiate the controller
             */
            (function init() {
                var mediaGroups = deviceService.getMediaGroups() || [];
                if (mediaGroups.length > 0) {
                    setMediaGroup($scope, mediaGroups[0]);
                }

                $rootScope.$on(signals.mediaGroupSelected, function (event, mediaGroup) {
                    setMediaGroup($scope, mediaGroup);
                });

                $scope.$on(signals.mediaArt, function (event, mediaArtUrl) {
                    $scope.mediaArtUrl = mediaArtUrl;
                });

                deviceService.onUpdate(onDevicesUpdate);
                mediaInfoService.onUpdate(onMediaInfoUpdate);
            }());
        }

        currentPlayStatusController.getId = function () {
            return "currentPlayStatusController";
        };

        app.controller(currentPlayStatusController.getId(), ["$rootScope", "$scope", services.deviceServiceId, services.mediaInfoService, currentPlayStatusController]);
    }
);
