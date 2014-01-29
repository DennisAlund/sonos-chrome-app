define(function (require) {
        "use strict";

        var app = require("ui/app");
        var serviceBase = require("./base");
        var messaging = require("shared/messaging");
        var signals = require("ui/shared/signals");


        /**
         * The mediaInfoService implements methods for retrieving information on what is currently being played
         * on a device
         *
         * @returns {object} Device Factory
         */
        function mediaInfoService($http, $rootScope) {
            var that = serviceBase();

            var mediaInfo = {};
            var activeDevice = {};

            that.getMediaInfo = function () {
                return mediaInfo;
            };

            that.setActiveDevice = function (device) {
                activeDevice = device || {};
                messaging.sendMessage(messaging.action.REQUEST_MEDIA_INFO, activeDevice.id || "");
            };

            function onMediaInfo(mediaInfoData) {
                mediaInfo = mediaInfoData || {};
                console.debug("Got media info.", mediaInfoData);

                var mediaArtUri = mediaInfoData.metaData.albumArtUri || null;
                var deviceAddress = activeDevice.address;
                if (mediaArtUri && deviceAddress) {
                    setArt("loading");
                    fetchImage(["http://", deviceAddress, mediaArtUri].join(""));
                }
                else {
                    setArt("default");
                }

                that.refresh();
            }

            function fetchImage(imageUrl) {
                var httpRequest = $http({method: "GET", url: imageUrl, responseType: "blob"});
                httpRequest.success(function (data) {
                    var urlCreator = webkitURL || URL;
                    setArt(urlCreator.createObjectURL(data));
                });
                httpRequest.error(function () {
                    setArt("default");
                });
            }

            function setArt(art) {
                var artUrl = "";
                if (art === "default") {
                    artUrl = "/ui/img/default_media_art.png";
                }
                else if (art === "loading") {
                    artUrl = "/ui/img/loading.gif";
                }
                else {
                    artUrl = art;
                }
                $rootScope.$broadcast(signals.mediaArt, artUrl);
            }

            /**
             * Initiate the service
             */
            (function init() {
                console.debug("Initiating mediaInfoService");
                messaging.addListenerFor(messaging.action.MEDIA_INFO, onMediaInfo);
            }());

            return that;
        }

        mediaInfoService.getId = function () {
            return "mediaInfoService";
        };

        app.factory(mediaInfoService.getId(), ["$http", "$rootScope", mediaInfoService]);

        return mediaInfoService;
    }
);
