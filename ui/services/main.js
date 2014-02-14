define(function (require) {
    "use strict";

    var deviceService = require("./deviceService");
    var mediaInfoService = require("./mediaInfoService");
    var mediaControlsService = require("./mediaControlsService");

    return {
        deviceServiceId: deviceService.getId(),
        mediaInfoService: mediaInfoService.getId(),
        mediaControlsService: mediaControlsService.getId()
    };
});
