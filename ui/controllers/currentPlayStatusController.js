define(function (require) {
        "use strict";

        var app = require("ui/app");
        var services = require("ui/services");
        var signals = require("ui/shared/signals");

        function currentPlayStatusController($rootScope, $scope, deviceService) {

            $rootScope.$on(signals.mediaGroupSelected, function (event, mediaGroup) {
                $scope.activeDevice = deviceService.getDeviceForMediaGroup(mediaGroup);
            });

        }

        currentPlayStatusController.getId = function () {
            return "currentPlayStatusController";
        };

        app.controller(currentPlayStatusController.getId(), ["$rootScope", "$scope", services.deviceServiceId, currentPlayStatusController]);
    }
);
