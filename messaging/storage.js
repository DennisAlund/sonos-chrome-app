require(["shared/util", "shared/constants", "models/message"],
    function (util, constants, messageModel) {
        // TODO: Add notification/subscription for changes in storage

        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            if (!sender || sender.id !== constants.APP_ID) {
                return;
            }

            message = messageModel(message);

            if (!message.isActionType(messageModel.actionType.STORAGE)) {
                return;
            }
            util.debugLog("Got message from: " + sender, message);
        });
    }
);
