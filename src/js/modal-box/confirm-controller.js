'use strict';

var angular = require('angular');

function ConfirmController($scope, $timeout) {
    var action = angular.copy($scope.data.config.action);

    $scope.ok = function () {

        $scope.close();
        if (action) {
            action(true);

        }
    };

    $scope.cancel = function () {
        $scope.close();
        if (action) {
            $timeout(function () {
                action(false);
            }, 0);
        }
    };
}

module.exports = ['$scope', '$timeout', ConfirmController];