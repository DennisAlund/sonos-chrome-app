require(["config"], function (config) {
    "use strict";

    require.config(config);

    require(["require", "shared/definitions"], function (require, definitions) {
        definitions.APP_PATH = "/ui/";
        definitions.APP_WINDOW = "main.html";

        require(["runtime"]);
    });
});
