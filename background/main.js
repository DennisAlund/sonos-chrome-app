define(function (require) {
        "use strict";

        console.debug("Firing up the background app");

        require("./install");
        require("./update");
        require("./launched");
        require("./suspend");
        require("./message");

        var sonos = require("sonos");
        var messaging = require("shared/messaging");

        sonos.service.onEvent(sonos.events.DEVICES, function (deviceInfo) {
            console.debug("On event");
            console.debug(deviceInfo);

            messaging.sendMessage(messaging.action.DEVICES, deviceInfo);
        });
    }
);
