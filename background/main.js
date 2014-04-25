define(function (require) {
    "use strict";

    console.debug("Firing up the background app");

    require("./install");
    require("./update");
    require("./lifecycle");

    var sonos = require("sonos");
    var messaging = require("shared/messaging");

    // Modules can be loaded at any time and in a lazy fashion. It means that they might have missed
    // any messaging that was promoting devices at the time that they were found
    messaging.addListenerFor(messaging.action.REQUEST_DEVICES, function (callback) {
        var devices = sonos.controller.getDevices();
        callback(devices);
    });

    // Event listener for whenever the list of devices is updated in the Sonos service
    sonos.event.on(sonos.event.action.DEVICES, function (deviceData) {
        messaging.sendMessage(messaging.action.DEVICES, deviceData);
    });

    messaging.addListenerFor(messaging.action.REQUEST_MEDIA_INFO, function (deviceId) {
        console.debug("REQUESTING MEDIA STATE FOR %s", deviceId);
        sonos.controller.requestMediaState(deviceId);
    });

    sonos.event.on(sonos.event.action.MEDIA_INFO, function (mediaData) {
        console.debug("****** EVENT %s ***********", sonos.event.action.MEDIA_INFO, mediaData);
        messaging.sendMessage(messaging.action.MEDIA_INFO, mediaData);
    });

});
