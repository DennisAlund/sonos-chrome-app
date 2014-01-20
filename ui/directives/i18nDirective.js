/**
 * Directive implementation from Google Group discussion
 * https://groups.google.com/forum/#!topic/angular/GYD07YuiVx0
 */

define(function (require) {
        "use strict";

        var app = require("ui/app");

        function oddI18nContent($compile) {
            return {
                restrict: "A",
                controller: function ($scope) {
                    var substitutes = [];
                    this.addSubstitute = function (index, content) {
                        substitutes[index] = content;
                    };
                    this.getSubstitutes = function () {
                        return substitutes;
                    };
                },
                link: function (scope, element, attr, controller) {
                    var message = chrome.i18n.getMessage(attr.oddI18nContent, controller.getSubstitutes());
                    element.html(message || "");
                    $compile(element.contents())(scope);
                }
            };
        }

        function oddI18nSubstitute() {
            return {
                restrict: "M",
                require: "^oddI18nContent",
                link: function (scope, element, attr, oddI18nContent) {
                    var match = attr.oddI18nSubstitute.match(/^\$([1-9]):(.*)$/);
                    if (match) {
                        oddI18nContent.addSubstitute(parseInt(match[1], 10) - 1, match[2]);
                    }
                }
            };
        }

        app.directive("oddI18nContent", ["$compile", oddI18nContent]);
        app.directive("oddI18nSubstitute", oddI18nSubstitute);
    }
);
