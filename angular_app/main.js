define([
    "require",
    "angular",
    "shared",
    "sonos",
    "./app"
], function (require, ng, shared, sonos, app) {
    "use strict";

    /*
     * place operations that need to initialize prior to app start here
     * using the `run` function on the top-level module
     */

    shared.util.appLog("Loading main.js");
    require(["domReady!"], function (document) {
        shared.util.appLog("The DOM is ready");
        ng.bootstrap(document, [shared.definitions.NG_APP_ID]);
        /*
        sonos.service.onEvent(sonos.events.DEVICE_FOUND, function(data){
            console.log(" **** BEGIN CHROME APP EVENT CALL BACK **** ");
            console.log(data);
            console.log(" **** END CHROME APP EVENT CALL BACK **** ");
        });
        */
        setTimeout(function() {
            sonos.service.start();
        }, 1000);
    });
});
