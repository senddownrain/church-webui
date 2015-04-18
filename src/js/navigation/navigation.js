'use strict';

var angular = require('angular');

angular
    .module('Navigation', ['Auth'])
    .controller('NavigationController', require('./navigation-controller'))
    .directive('navigation', require('./navigation-directive'));