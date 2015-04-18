'use strict';

var angular = require('angular');

function AuthService(RequestService, UserModel /* , PermissionsService, md5 */) {
    var currentUser = new UserModel();

    /*var getHashedPassword = function(role, pass){
        var realm = "Church Login";
        var intermediateHash = md5.createHash(role + ":" + realm + ":" + pass);
        return md5.createHash(role + ":" + realm + ":" + intermediateHash);
    };*/

    this.login = function (name, password) {
        var userData = {
            name: name,
            password: password
        };

        return RequestService
            .request({
                url: 'login',
                method: 'post',
                data: userData
            })
            .then(function (response) {
                if (response.status === 200) {
                    angular.extend(currentUser, userData, response.data);
                }
                angular.extend(currentUser, userData, response.data);
            });
    };

    this.changePassword = function (role, currentPassword, newPassword) {

                var userData = {
                    role: role,
                    currentPassword: currentPassword,
                    newPassword: newPassword
                };

                return RequestService
                    .request({
                        url: 'change-password',
                        method: 'post',
                        data: userData
                    })
                    .then(function () {
                        if (userData.role === currentUser.role) {
                            currentUser.password = userData.newPassword;
                        }
                    });
    };

    this.getCurrentUser = function () {
        return currentUser;
    };

    this.isUserLoggedIn = function () {
        return currentUser.isLoggedIn();
    };
}

module.exports = ['RequestService', 'UserModel' /*, 'PermissionsService', 'md5' */, AuthService];