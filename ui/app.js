define(function (require) {
    "use strict";

    require("angularBootstrap");
    require("angularSlider");
    var ng = require("angular");

    var sonosApp = ng.module("sonosApp", ["ui.bootstrap", "uiSlider"]);

    sonosApp.config(["$compileProvider", function ($compileProvider) {
            // Some magic to make references to locally packaged resources work
            //   - https://github.com/angular/angular.js/issues/3721
            //   - http://docs.angularjs.org/api/ng.$compileProvider
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|(blob:)?chrome-extension)(:|%3A)|data:image\//);
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome-extension):/);

        }]
    );

    return sonosApp;
});
