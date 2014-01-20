define(function (require) {
        "use strict";

        var app = require("ui/app");
        var services = require("ui/services");
        var signals = require("ui/shared/signals");

        function roomListController($scope, deviceService) {

            function onDevicesUpdate() {
                $scope.$apply();
            }

            deviceService.onUpdate(onDevicesUpdate);
            //deviceService.subscribeToUpdate($scope);
            $scope.mediaGroups = deviceService.getMediaGroups();
            $scope.label = {
                groupButtonText: chrome.i18n.getMessage("deviceListGroupButton")
            };

            $scope.selectMediaGroup = function (mediaGroupName) {
                console.debug("Selected media group: %s", mediaGroupName);
                //deviceService.setActiveMediaGroup(mediaGroupName);
                $scope.$emit(signals.mediaGroupSelected, mediaGroupName);
            };
        }

        roomListController.getId = function () {
            return "roomListController";
        };

        app.controller(roomListController.getId(), ["$scope", services.deviceServiceId, roomListController]);
    }
);
