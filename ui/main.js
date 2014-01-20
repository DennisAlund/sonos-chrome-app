define(function (require) {
    "use strict";

    var shared = require("shared");
    var ng = require("angular");

    shared.util.appLog("Loading main.js");

    require(["domReady!"], function (document) {
        shared.util.appLog("The DOM is ready");
        // Removing the "hide" class from body. ng-cloak doesn't seem to work well with AMD
        document.getElementsByTagName("body")[0].className = "";
        var app = require("ui/app");
        require("./controllers");
        require("./services");

        ng.bootstrap(document, [app.name]);
    });
});
