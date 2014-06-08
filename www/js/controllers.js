(function () {
  "use strict";

  var controllers = angular.module('app.controllers', []);

  controllers.controller('LoadingScreenCtrl', [
    '$state',
    function ($state) {
      console.log("This should get logged.");
    }
  ]);

})();