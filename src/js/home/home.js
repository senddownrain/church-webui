'use strict';

var angular = require('angular');

angular
    .module('Home', [])
    .config(require('./home-config'))
    .controller('HomeController', require('./home-controller'))
    .factory('ChurchModel', function () {
        return require('./models/church-model');
    });