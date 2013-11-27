define(["shared"], function (shared) {
    shared.util.debugLog("Loaded sonos-desktop");


    return function () {
        var that = {};

        that.doSomeHtmlStuff = function () {
            $(document).ready(function () {

                $("[data-html]").each(function () {
                    el = $(this);
                    var src = $(this).attr("data-html");
                    el.load(src);
                });

                debugger;

            });
        };

        return that;
    };
});
