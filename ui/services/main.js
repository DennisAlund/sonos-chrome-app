define(function (require) {
    "use strict";

    var deviceService = require("./deviceService");

    return {
        deviceServiceId: deviceService.getId()
    };
});
