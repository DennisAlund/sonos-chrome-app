define(function (require) {
        "use strict";

        var app = require("ui/app");

        function roomListController($scope, deviceFactory) {

            function createRoomList() {
                return deviceFactory.getDevices().map(function (device) {
                    return { name: device.room };
                });
            }

            deviceFactory.onUpdate(function () {
                $scope.rooms = createRoomList();
                $scope.$apply();
            });

            $scope.rooms = createRoomList();
            $scope.groupButtonText = chrome.i18n.getMessage("deviceListGroupButton");
        }

        app.controller("roomListController", ["$scope", "deviceFactory", roomListController]);
    }
);
