'use strict';

var angular = require('angular');

angular
    .module('Common', [])
    .factory('TranslationLoader', require('./translation-loader'))
//  .service('AnyService', require('./any-service'))
    .directive('exportFile', require('./export-file-directive'));
