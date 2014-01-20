require(["config"], function (config) {

    "use strict";

    require.config(config);
    require.config({
        baseUrl: "../",
        paths: {
            bootstrap: "lib/bootstrap/dist/js/bootstrap.min",
            domReady: "lib/requirejs-domready/domReady",
            angular: "lib/angular/angular",
            angularBootstrap: "lib/angular-ui-bootstrap-bower/ui-bootstrap-tpls.min"
        },
        packages: [
            "ui",
            "ui/controllers",
            "ui/directives",
            "ui/services"
        ],
        shim: {
            angular: {exports: "angular"},
            angularBootstrap: { deps: ["angular"]}
        },
        enforceDefine: false
    });

    require(["ui"]);
});
