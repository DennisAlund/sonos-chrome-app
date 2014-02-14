define(function (require) {
        "use strict";

        var app = require("ui/app");
        var serviceBase = require("./base");
        var messaging = require("shared/messaging");


        /**
         * The mediaInfoService implements methods for retrieving information on what is currently being played
         * on a device
         *
         * @returns {object} Device Factory
         */
        function mediaInfoService($http) {
            var that = serviceBase();

            var currentMediaInfo = {};
            var mediaArtUrl = null;

            var IMAGE_URL_DEFAULT = "/ui/img/default_media_art.png";
            var IMAGE_URL_LOADING = "/ui/img/loading.gif";

            that.getMediaInfo = function () {
                return currentMediaInfo;
            };

            that.getDefaultMediaArtUrl = function () {
                return IMAGE_URL_DEFAULT;
            };

            /**
             * Due to CSP restrictions in Chrome apps, it is not possible to just set img src to an external url.
             * So we need to make an XHR to fetch image data, store the data locally and create a local URL to the image
             * blob that will be added to the application resources temporarily with an URL similar to:
             *
             *      blob:chrome-extension%3A//madmeihladfgcdchipmbnngnlpbpfppp/89d758b6-e1dd-4f85-83b2-030d0757dcbf
             *
             * The callback method should take a single argument, which is an URL to the image resource. It can be called
             * several times since it will update the current image with loading status.
             *
             * @param {object}      mediaInfo  Media info object to fetch image for
             * @param {function}    callback   Callback method that takes single string argument, which is the local URL
             */
            that.getMediaArtUrl = function (mediaInfo, callback) {
                mediaInfo = mediaInfo || {metaData: {}, device: {}};
                var mediaArtUri = mediaInfo.metaData.albumArtUri || null;
                var deviceAddress = mediaInfo.device.address;

                if (!(mediaArtUri && deviceAddress)) {
                    callback(IMAGE_URL_DEFAULT);
                    return;
                }
                // Show loading
                callback(IMAGE_URL_LOADING);

                var remoteImageUrl = ["http://", deviceAddress, mediaArtUri].join("");
                $http.get(remoteImageUrl, {responseType: "blob"})
                    .success(function (data) {
                        var urlCreator = webkitURL || URL;
                        callback(urlCreator.createObjectURL(data));
                    })
                    .error(function () {
                        callback(IMAGE_URL_DEFAULT);
                    });
            };


            /**
             * Asynchronous call for mediaInfo for a specific device
             *
             * @param {object}    device
             */
            that.requestMediaInfo = function (device) {
                messaging.sendMessage(messaging.action.REQUEST_MEDIA_INFO, device.id || "");
            };

            that.reset = function () {
                currentMediaInfo = {};
                mediaArtUrl = null;
            };

            function onMediaInfo(mediaInfoData) {
                currentMediaInfo = mediaInfoData || {};
                console.debug("Got media info.", mediaInfoData);
                that.refresh();
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

        app.factory(mediaInfoService.getId(), ["$http", mediaInfoService]);

        return mediaInfoService;
    }
);
