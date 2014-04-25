define(function (require) {
        "use strict";

        var app = require("ui/app");
        var services = require("ui/services");
        var signals = require("ui/shared/signals");

        function roomListController($scope, deviceService) {
            $scope.mediaGroups = [];
            $scope.currentMediaGroup = null;
			$scope.labels = {
				noMediaGroups: chrome.i18n.getMessage("noMediaGroupsShort")
			};

            $scope.selectMediaGroup = function (mediaGroup) {
                if ($scope.currentMediaGroup === mediaGroup) {
                    return;
                }
                console.debug("Selected media group: %s", mediaGroup);
                setMediaGroup($scope, mediaGroup);
            };

            function setMediaGroup(scope, mediaGroup) {
                scope.currentMediaGroup = mediaGroup;
                scope.$emit(signals.mediaGroupSelected, mediaGroup);
            }

            function onDevicesUpdate() {
                var mediaGroups = deviceService.getMediaGroups();
                var haveMediaGroup = $scope.currentMediaGroup ? true : false;
                var isGroupPresent = haveMediaGroup && mediaGroups.some(function (mediaGroup) {
                    return mediaGroup === $scope.currentMediaGroup;
                });

                $scope.$apply(function (scope) {
                    scope.mediaGroups = mediaGroups;
                    if (!isGroupPresent) {
                        setMediaGroup(scope, mediaGroups[0]);
                    }
                });
            }

            (function init() {
                console.debug("Initiating roomListController");
                $scope.mediaGroups = deviceService.getMediaGroups() || [];
                if ($scope.mediaGroups.length > 0) {
                    setMediaGroup($scope, $scope.mediaGroups[0]);
                }

                deviceService.onUpdate(onDevicesUpdate);
            }());
        }

        roomListController.getId = function () {
            return "roomListController";
        };

        app.controller(roomListController.getId(), ["$scope", services.deviceServiceId, roomListController]);
    }
);
