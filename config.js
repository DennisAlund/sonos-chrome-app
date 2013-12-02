define(function () {
    "use strict";

    return {
        baseUrl: "/",
        paths: {
            sugar: "lib/sugarjs/release/sugar.min",
            sonos: "lib/sonos/dist/sonos"
        },
        packages: ["shared", "models", "messaging"],
        shim: {
            sugar: {exports: "sugar"}
        },
        enforceDefine: false
    };
});
