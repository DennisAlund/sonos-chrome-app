require(["config"], function (config) {


    requirejs.config(config);
    requirejs.config({
        baseUrl: "../",
        paths: {
            bootstrap: "lib/bootstrap/dist/js/bootstrap.min",
            jquery: "lib/jquery/jquery.min",
            domReady: "lib/requirejs-domready/domReady",
            angular: "lib/angular/angular"
        },
        packages: [
            "angular_app",
            "angular_app/controllers",
            "angular_app/directives",
            "angular_app/filters",
            "angular_app/services"
        ],
        shim: {
            angular : {exports : "angular"},
            bootstrap: { deps: ["jquery"], exports: "jQuery" }
        },
        enforceDefine: false
    });

    require(["require", "shared/definitions"], function(require, definitions){
        // Set up definitions
        definitions.NG_APP_ID = "app";

        // Get the app up
        require(["angular_app"]);
    });
});
