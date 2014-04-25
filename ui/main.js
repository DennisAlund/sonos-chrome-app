define(function (require) {
    "use strict";

    var shared = require("shared");
    var ng = require("angular");

    shared.util.appLog("Loading main.js");

    require(["domReady!", "ui/app", "ui/controllers", "ui/services"], function (document, app) {
        shared.util.appLog("The DOM is ready");
        // Removing the "hide" class from body. ng-cloak doesn't seem to work well with AMD
		var bodyClasses = document.getElementsByTagName("body")[0].className
        document.getElementsByTagName("body")[0].className = bodyClasses.replace("hide", "");

        ng.bootstrap(document, [app.name]);
    });
});
