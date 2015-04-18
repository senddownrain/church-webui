'use strict';

function navigationDirective() {
    return {
        restrict: 'E',
        template: require('./navigation.html'),
        controller: 'NavigationController'
    };
}

module.exports = navigationDirective;
