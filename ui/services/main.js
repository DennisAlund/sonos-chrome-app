define(function (require) {
    "use strict";

    var deviceService = require("./deviceService");
    var mediaInfoService = require("./mediaInfoService");

    return {
        deviceServiceId: deviceService.getId(),
        mediaInfoService: mediaInfoService.getId()
    };
});
