define(['./settings', './message'],
    function (settings, message) {
        console.log("Models package is being loaded!");
        return {
            settings: settings,
            message: message
        };
    }
);
