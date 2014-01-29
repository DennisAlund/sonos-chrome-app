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

            var IMAGE_URL_DEFAULT = "/ui/img/default_media_art.png";
            var IMAGE_URL_LOADING = "/ui/img/loading.gif";

            that.getMediaInfo = function () {
                return mediaInfo;
            };

            that.getDefaultImageUrl = function () {
                return IMAGE_URL_DEFAULT;
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
                    setMediaArtUrl(IMAGE_URL_LOADING);
                    fetchImage(["http://", deviceAddress, mediaArtUri].join(""));
                }
                else {
                    setMediaArtUrl(IMAGE_URL_DEFAULT);
                }

                that.refresh();
            }

            /**
             * Due to CSP restrictions in Chrome apps, it is not possible to just set img src to an external url.
             * So we need to make an XHR to fetch image data, store the data locally and create a local URL to the image
             * blob that will be added to the application resources temporarily with an URL similar to:
             *
             *      blob:chrome-extension%3A//madmeihladfgcdchipmbnngnlpbpfppp/89d758b6-e1dd-4f85-83b2-030d0757dcbf
             *
             * @param imageUrl
             */
            function fetchImage(imageUrl) {
                var httpRequest = $http({method: "GET", url: imageUrl, responseType: "blob"});
                httpRequest.success(function (data) {
                    var urlCreator = webkitURL || URL;
                    setMediaArtUrl(urlCreator.createObjectURL(data));
                });
                httpRequest.error(function () {
                    setMediaArtUrl(IMAGE_URL_DEFAULT);
                });
            }

            function setMediaArtUrl(url) {
                $rootScope.$broadcast(signals.mediaArt, url);
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
