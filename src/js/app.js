'use strict';

var angular = require('angular');

require('./mocks');
require('./request/request');
require('./modal-box/modal-box');
require('./auth/auth');
require('./common/common');
require('./navigation/navigation');
//require('./login/login');
require('./home/home');
require('./about/about');


angular.element(document).ready(function () {
    function appConfig($translateProvider) {
        var $cookies;
        angular.injector(['ngCookies']).invoke(function(_$cookies_) {
            $cookies = _$cookies_;
        });

        $translateProvider
            .useLoader('TranslationLoader')
            .preferredLanguage($cookies.uiLanguage || 'en');
    }

    function routerConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise('home');
    }

    function run($rootScope /*, $state, AuthService*/) {

        $rootScope.$on('$stateChangeStart', function (/* event, toState */) {
            /*
            // Prevent redirection of any user to any non-login url if the user is not logged in.
            if (toState.name !== 'login' && !AuthService.isUserLoggedIn()) {
                event.preventDefault();
                $state.go('login');
            }

            // Prevent redirection of any user to login url if the user is already logged in.
            if (toState.name === 'login' && AuthService.isUserLoggedIn()) {
                event.preventDefault();
                $state.go('home');
            }
            */
        });
    }

    angular
        .module('ChurchWebUIApp', [
            'ngCookies',
            'ui.router',
            'ui.bootstrap',
            'pascalprecht.translate',
            'ChurchWebUIApp.Mocks',
            'angular-md5',
            'Request',
            'ModalBox',
            'Auth',
            'Common',
            'Navigation',
            //'Login',
            'Home',
            'About'
        ])
        .config(['$translateProvider', appConfig])
        .config(['$urlRouterProvider', routerConfig])
        .run(['$rootScope', '$state', 'AuthService', run]);

    angular.bootstrap(document, ['ChurchWebUIApp']);
});