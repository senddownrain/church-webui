'use strict';

function config($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            template: require('./login.html'),
            controller: 'LoginController'
        });
}

module.exports = ['$stateProvider', config];