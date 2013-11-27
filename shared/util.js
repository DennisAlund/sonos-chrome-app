define([],
    function () {
        "use strict";
        return (function () {
            var that = {};

            // ---------------------------------------------------------------------------------------------------------
            // LOGGING

            //TODO: Make build script redefine appLog and debugLog into empty "function(){}"
            that.appLog = function (message) {
                console.log("[" + (new Date()).toISOString() + "] " + message);
            };

            that.debugLog = function (message, obj) {
                console.log("[" + (new Date()).toISOString() + "] *** DEBUG *** " + message);
                if (obj) {
                    console.log('<object>');
                    console.log(obj);
                    console.log('</object>');
                }
            }

            // ---------------------------------------------------------------------------------------------------------
            // VERSION HANDLING

            function parseVersionString(versionString) {
                versionString = versionString || "0";

                var version = versionString.split(".").map(function (x) {
                    return parseInt(x) || 0;
                });

                if (!version.length) {
                    throw "Version format is not properly formatted. Can not apply changes.";
                }

                return {
                    major: version[0],
                    minor: version[1] || 0,
                    build: version[2] || 0
                };
            }

            that.shouldApplyUpdate = function(referenceVersion, previousVersion) {
                var previous = parseVersionString(previousVersion);
                var reference = parseVersionString(referenceVersion);

                return reference.major > previous.major
                    || reference.minor > previous.minor
                    || reference.build > previous.build;
                
            }

            that.isEqualVersion = function(version1, version2) {
                var v1 = parseVersionString(version1);
                var v2 = parseVersionString(version2);

                return v1.major === v2.major
                    && v1.minor === v2.minor
                    && v1.build === v2.build;
            };

            return that;
        })();
    }
);
