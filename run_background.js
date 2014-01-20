require(["config"], function (config) {
    "use strict";

    require.config(config);
    require.config({
        packages: ["background"]
    });

    require(["background"]);
});
