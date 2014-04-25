define(function (require) {
		"use strict";

		var app = require("ui/app");
		var services = require("ui/services");
		var signals = require("ui/shared/signals");

		/**
		 * Manage all the media controls, such as play, pause, etc.
		 *
		 * @param $rootScope
		 * @param $scope
		 * @param deviceService
		 * @param mediaControlsService
		 */
		function mediaControlsController($rootScope, $scope, deviceService, mediaControlsService) {

			$scope.mediaGroup = null;

			$scope.groupState = {
				isPlaying: false
			};

			$scope.toggleRepeat = function () {

			};

			$scope.toggleShuffle = function () {

			};


			$scope.play = function () {
				setPlayState(mediaControlsService.playerState.play);
			};

			$scope.pause = function () {
				setPlayState(mediaControlsService.playerState.pause);
			};

			$scope.skipForward = function onSkipForward() {
				var device = deviceService.getDeviceForMediaGroup($scope.mediaGroup);
				console.debug("Skipping music forward in '%s'", $scope.mediaGroup);

				mediaControlsService.seek(device, mediaControlsService.seekOperation.skipForward);
			};


			$scope.skipBackward = function onSkipBackward() {
				var device = deviceService.getDeviceForMediaGroup($scope.mediaGroup);
				console.debug("Skipping music backward in '%s'", $scope.mediaGroup);

				mediaControlsService.seek(device, mediaControlsService.seekOperation.skipBackward);
			};


			// ---------------------------------------------------------------------------------------------------------
			// ---------------------------------------------------------------------------------------------------------
			// PRIVATE METHODS

			function setPlayState(playState) {
				$scope.groupState.isPlaying = playState === mediaControlsService.playerState.play;
				var device = deviceService.getDeviceForMediaGroup($scope.mediaGroup);
				console.debug("Set player state to '%s' for '%s'", playState, $scope.mediaGroup);
				mediaControlsService.setState(device, playState);
			}


			// ---------------------------------------------------------------------------------------------------------
			// ---------------------------------------------------------------------------------------------------------
			// INIT

			(function init() {
				console.debug("Initiating mediaControlsController");
				$rootScope.$on(signals.mediaGroupSelected, function (event, mediaGroup) {
					$scope.mediaGroup = mediaGroup;
				});
			}());

		}

		mediaControlsController.getId = function () {
			return "mediaControlsController";
		};

		app.controller(mediaControlsController.getId(),
			["$rootScope", "$scope", services.deviceServiceId, services.mediaControlsService, mediaControlsController]);
	}
);
