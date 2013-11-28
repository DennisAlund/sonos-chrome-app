define(function () {
        "use strict";

        function roomListController($scope) {
            $scope.groupButtonText = chrome.i18n.getMessage("deviceListGroupButton");
            $scope.rooms = [
                {"name": "Kitchen"},
                {"name": "Living room"}
            ];
        }

        return roomListController;
    }
);
