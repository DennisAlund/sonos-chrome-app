require(["config"], function (config) {
    "use strict";

    require.config(config);
    require.config({
        packages: ["runtime"]
    });

    require(["runtime"]);
});
