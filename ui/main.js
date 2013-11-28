define(function (require) {
    "use strict";

    var shared = require("shared");

    /*
     * place operations that need to initialize prior to app start here
     * using the `run` function on the top-level module
     */

    shared.util.appLog("Loading main.js");
    require(["domReady!"], function (document) {
        var app = require("ui/app");

        var ng = require("angular");

        shared.util.appLog("The DOM is ready");

        ng.bootstrap(document, [app.name]);

        /*
        sonos.service.onEvent(sonos.events.DEVICE_FOUND, function(data){
            console.log(" **** BEGIN CHROME APP EVENT CALL BACK **** ");
            console.log(data);
            console.log(" **** END CHROME APP EVENT CALL BACK **** ");
        });
        */
    });
});
