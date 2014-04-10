(function () {
  "use strict";

  var controllers = angular.module('spokes.controllers', []);

  controllers.controller('LoadingScreenCtrl', ['$scope', function ($scope) {
    console.log("This is executed.");
  }]);

})();