'use strict';

var angular = require('angular');

function RequestService($http) {
    var defaultConfig = {
        cache: false
    };

    this.request = function (config) {
        // Extend default config with the provided config
        config = angular.extend({}, defaultConfig, config);

        // Execute AJAX call and return a promise
        return $http(config);
    };
}

angular.module('Request', [])
    .service('RequestService', ['$http', RequestService]);
