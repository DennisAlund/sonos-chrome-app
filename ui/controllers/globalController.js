define(function (require) {
        "use strict";

        var app = require("ui/app");

        /**
         * Controller for the menu bar that is at the top of the application.
         *
         * @param $scope
         * @param topBarController
         */
        function globalController($scope) {
            $scope.label = {
				applicationName: chrome.i18n.getMessage("appName"),
				button: {
					search: chrome.i18n.getMessage("searchButtonText")
				}
			};

            // ---------------------------------------------------------------------------------------------------------
            // ---------------------------------------------------------------------------------------------------------
            // INIT

            (function init() {
                console.debug("Initiating globalController");
            }());

        }

		globalController.getId = function () {
            return "globalController";
        };

        app.controller(globalController.getId(), ["$rootScope", "$scope", globalController]);
    }
);
