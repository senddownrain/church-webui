'use strict';

function config($stateProvider) {
    $stateProvider
        .state('about', {
            url: '/about',
            template: require('./about.html')
        });
}

module.exports = ['$stateProvider', config];