'use strict';

var angular = require('angular');

angular
    .module('ModalBox', [])
    .service('ModalBoxService', require('./modal-box-service'))
    .directive('modalBox', require('./modal-box-directive'))
    .controller('ConfirmController', require('./confirm-controller'));