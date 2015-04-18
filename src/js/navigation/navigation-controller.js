'use strict';

function NavigationController($scope, AuthService, ModalBoxService) {
    $scope.currentUser = AuthService.getCurrentUser();

    var loginFormConfig = {
        overlay: true,
        template: require('../login/login.html'),
        isAdmin: false
    };

    $scope.showLoginForm = function () {
        $scope.toggleUserRoleMenu();
        loginFormConfig.isAdmin = !$scope.currentUser.isAdmin();
        ModalBoxService.show(loginFormConfig);
    };

    $scope.toggleUserRoleMenu = function () {
        $scope.showUserRoleMenu = !$scope.showUserRoleMenu;
    };
}

module.exports = ['$scope', 'AuthService', 'ModalBoxService', NavigationController];