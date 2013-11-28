define(function (require) {
    "use strict";

    require("angularBootstrap");
    var ng = require("angular");
    var definitions = require("shared/definitions");
    var controllers = require("ui/controllers");


    var app = ng.module("sonosApp", ["ui.bootstrap"]);
    app.controller(controllers);

    return app;

    /*
     definitions.NG_APP_ID + ".services",
     definitions.NG_APP_ID + ".controllers",
     definitions.NG_APP_ID + ".filters",
     definitions.NG_APP_ID + ".directives"
     ]);
     */
});
