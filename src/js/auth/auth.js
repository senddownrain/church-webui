'use strict';

var angular = require('angular');

angular
    .module('Auth', [])
    .service('AuthService', require('./auth-service'))
    .factory('UserModel', function () {
        return require('./user-model');
    });
