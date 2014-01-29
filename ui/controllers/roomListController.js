define(function (require) {
        "use strict";

        var app = require("ui/app");
        var services = require("ui/services");
        var signals = require("ui/shared/signals");

        function roomListController($scope, deviceService) {
            $scope.label = {
                groupButtonText: chrome.i18n.getMessage("deviceListGroupButton")
            };

            $scope.selectMediaGroup = function (mediaGroup) {
                console.debug("Selected media group: %s", mediaGroup.name);
                $scope.$emit(signals.mediaGroupSelected, mediaGroup);
            };

            function setServiceData(scope) {
                scope.mediaGroups = deviceService.getMediaGroups();
            }

            function onDevicesUpdate() {
                $scope.$apply(function (scope) {
                    setServiceData(scope);
                });
            }

            (function init() {
                setServiceData($scope);
                deviceService.onUpdate(onDevicesUpdate);
            }());
        }

        roomListController.getId = function () {
            return "roomListController";
        };

        app.controller(roomListController.getId(), ["$scope", services.deviceServiceId, roomListController]);
    }
);
