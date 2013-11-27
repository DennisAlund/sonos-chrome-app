define(['./storage'],
    /**
     * This package provides a collection of communication modules that listens and sends messages from and to the UI
     */
    function (storage) {
        console.log("Messaging package is being loaded!");
        return {
            storage: storage
        };
    }
);
