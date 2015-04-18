'use strict';

var angular = require('angular');

function MockService($httpBackend) {

    $httpBackend.whenGET(/top-churches/).respond(function(){
        return [200, {
                        churchList:[
                                {
                                    name: 'Church 1',
                                    address: 'Address 1'
                                },
                                {
                                    name: 'Name 2',
                                    address: 'Address 2'
                                }
                            ]}];
    });


    // login mocks

    var userRoles = {
        user: {
            password: 'user',
            permissions: {
                edit: true
            }
        },
        admin: {
            password: 'admin',
            permissions: {
                delete: true
            }
        }
    };

    $httpBackend.whenPOST(/login.server$/).passThrough();
    $httpBackend.whenPOST(/login$/).respond(function (method, url, data) {
        try {
            var userData = angular.fromJson(data),
                userRole = userRoles[userData.role.toLowerCase()];

            if (userRole && userRole.password === userData.password) {
                // Valid combination of user role and password.
                return [200, angular.copy(userRole)];
            } else {
                // Invalid user role or password.
                return [401];
            }
        } catch (e) {
            return [500];
        }
    });

    $httpBackend.whenPOST(/change-password.server$/).passThrough();
    $httpBackend.whenPOST(/change-password$/).respond(function (method, url, data) {
        try {
            var userData = angular.fromJson(data),
                userRole = userRoles[userData.role.toLowerCase()];

            if (userRole && userRole.password === userData.currentPassword) {
                // Valid combination of user role and current password.
                userRole.password = userData.newPassword;
                return [200];
            } else {
                // Invalid user role or current password.
                return [401];
            }
        } catch (e) {
            return [500];
        }
    });

}

angular.module('ChurchWebUIApp.Mocks', ['ngMockE2E'])
    .run(['$httpBackend', MockService]);