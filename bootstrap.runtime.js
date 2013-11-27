require(["config"], function (config) {
    require.config(config);
    require(["require", "shared/definitions"], function(require, definitions){
        definitions.APP_PATH = "/angular_app/";
        definitions.APP_WINDOW = "main.html";

        require(["runtime"]);
    });
});
