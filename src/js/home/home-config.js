'use strict';

function config($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            template: require('./home.html'),
            controller: 'HomeController'
        });
}

module.exports = ['$stateProvider', config];