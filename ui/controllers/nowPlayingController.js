define(function (require) {
        "use strict";

        var app = require("ui/app");
        var services = require("ui/services");
        var signals = require("ui/shared/signals");

        function nowPlayingController($rootScope, $scope, deviceService, mediaInfoService) {

            var currentMediaInfoId = "";

            $scope.mediaArtUrl = mediaInfoService.getDefaultMediaArtUrl();
            $scope.descriptions = [];
            $scope.mediaGroup = null;

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

                var device = deviceService.getDeviceForMediaGroup(mediaGroup);
                if (!device) {
                    console.warn("No device found for media group: %s", mediaGroup.name);
                    return;
                }

                console.debug("Setting active media group '%s' for device '%s'", mediaGroup.name, device.id);
                scope.mediaGroup = mediaGroup;
                mediaInfoService.requestMediaInfo(device);
            }

            function setDescription(scope, header, description) {
                scope.descriptions.push({
                    header: header,
                    value: description
                });
            }

            function reset(scope) {
                mediaInfoService.reset();
                scope.mediaArtUrl = mediaInfoService.getDefaultMediaArtUrl();
                scope.descriptions.splice(0, $scope.descriptions.length);
            }


            // ---------------------------------------------------------------------------------------------------------
            // ---------------------------------------------------------------------------------------------------------
            // CALLBACKS FOR EXTERNAL SOURCE UPDATES TO APPLY TO THE SCOPE

            /**
             * Callback function that will trigger when mediaInfoService has received new media info state.
             */
            function onMediaInfoUpdate() {
                var mediaInfo = mediaInfoService.getMediaInfo();
                if (mediaInfo.id === currentMediaInfoId) {
                    // Abort so that there are no unnecessary refreshing of the meta data
                    return;
                }

                currentMediaInfoId = mediaInfo.id;
                reset($scope);
                $scope.$apply(function (scope) {
                    if (mediaInfo.mediaType === "MEDIA_TYPE_MUSIC_FILE") {
                        setDescription(scope, chrome.i18n.getMessage("musicTrack"), mediaInfo.metaData.title);
                        setDescription(scope, chrome.i18n.getMessage("musicArtist"), mediaInfo.metaData.artist);
                        setDescription(scope, chrome.i18n.getMessage("musicAlbum"), mediaInfo.metaData.album);
                    }
                    mediaInfoService.getMediaArtUrl(mediaInfo, function (url) {
                        scope.mediaArtUrl = url;
                    });
                });

                $rootScope.$broadcast(signals.mediaArt, $scope.mediaArtUrl);
            }

            // ---------------------------------------------------------------------------------------------------------
            // ---------------------------------------------------------------------------------------------------------
            // INIT

            (function init() {
                console.debug("Initiating nowPlayingController");
                $rootScope.$on(signals.mediaGroupSelected, function (event, mediaGroup) {
                    setMediaGroup($scope, mediaGroup);
                });

                $scope.$on(signals.mediaArt, function (event, mediaArtUrl) {
                    $scope.mediaArtUrl = mediaArtUrl;
                });

                mediaInfoService.onUpdate(onMediaInfoUpdate);
            }());
        }

        nowPlayingController.getId = function () {
            return "nowPlayingController";
        };

        var args = ["$rootScope", "$scope", services.deviceServiceId, services.mediaInfoService, nowPlayingController];
        app.controller(nowPlayingController.getId(), args);
    }
);
