define([
    "angular",
    "shared/definitions",
    "./controllers",
    "./directives",
    "./filters",
    "./services"

], function (ng, definitions) {
    "use strict";
    return ng.module(definitions.NG_APP_ID, [
        definitions.NG_APP_ID + ".services",
        definitions.NG_APP_ID + ".controllers",
        definitions.NG_APP_ID + ".filters",
        definitions.NG_APP_ID + ".directives"
    ]);
});
